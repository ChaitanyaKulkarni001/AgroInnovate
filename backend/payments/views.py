import uuid
from datetime import datetime

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from account.models import StripeModel, OrderModel
from .models import PromoCode, Transaction


def generate_customer_id():
    """
    Generate a pseudo-customer ID. In a real system, you'd tie this to an actual payment provider customer.
    Here we just generate a UUID string.
    """
    return f"cus_{uuid.uuid4().hex}"


def generate_card_id():
    """
    Generate a pseudo-card ID. In a real system, this comes from Stripe.
    Here we just generate a UUID string.
    """
    return f"card_{uuid.uuid4().hex}"


def get_or_create_customer_id_for_user(email, user):
    """
    Find an existing customer_id for this user/email in StripeModel, or create a new one.
    We assume that all cards saved by the same user belong to one customer_id.
    """
    existing = StripeModel.objects.filter(user=user, email=email).first()
    if existing:
        return existing.customer_id
    else:
        # generate new and return
        return generate_customer_id()


class TestStripeImplementation(APIView):
    """
    Simulate PaymentIntent.create: always return a dummy successful PaymentIntent-like dict.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        # Expect maybe amount and currency in request, but original code uses fixed amount=120, currency='inr'
        amount = request.data.get("amount", 120)
        currency = request.data.get("currency", "inr")
        # Generate a dummy PaymentIntent-like response
        pi_id = f"pi_{uuid.uuid4().hex}"
        test_payment_process = {
            "id": pi_id,
            "object": "payment_intent",
            "amount": amount,
            "currency": currency,
            "status": "succeeded",
            "client_secret": f"{pi_id}_secret_{uuid.uuid4().hex}",
            # you can add more fields if needed
        }
        return Response(data=test_payment_process, status=status.HTTP_200_OK)


class ValidatePromoCodeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        code = request.data.get('code')
        if not code:
            return Response({"detail": "Code is required"}, status=status.HTTP_400_BAD_REQUEST)
        promo = PromoCode.objects.filter(code__iexact=code).first()
        if not promo or not promo.is_valid_now():
            return Response({"valid": False}, status=status.HTTP_200_OK)
        return Response({
            "valid": True,
            "discount_percent": promo.discount_percent,
            "code": promo.code,
            "description": promo.description
        }, status=status.HTTP_200_OK)


class CheckTokenValidation(APIView):
    """
    Simple endpoint to check authentication; always returns valid if authenticated.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response("Token is Valid", status=status.HTTP_200_OK)


class CreateCardTokenView(APIView):
    """
    Simulate card tokenization and attaching to a pseudo-customer.
    Checks if last4 matches an existing saved card for a different email -> error.
    Otherwise, simulate token creation, assign (or reuse) a customer_id, generate a card_id,
    and save in StripeModel if requested.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        email = data.get("email")
        save_card_flag = data.get("save_card", False)

        # Validate presence of required fields
        required_fields = ["number", "exp_month", "exp_year"]
        for field in required_fields:
            if field not in data:
                return Response({"detail": f"'{field}' is required."},
                                status=status.HTTP_400_BAD_REQUEST)

        card_number = str(data["number"]).strip()
        # Only keep digits; if formatted with spaces/hyphens, user should send digits only ideally.
        # For simulation, assume user sends digits.
        if len(card_number) < 4:
            return Response({"detail": "Card number too short."},
                            status=status.HTTP_400_BAD_REQUEST)
        last4 = card_number[-4:]
        exp_month = data["exp_month"]
        exp_year = data["exp_year"]

        # 1) Check if last4 matches any existing card for a different email:
        conflicting = StripeModel.objects.filter(card_number__endswith=last4).exclude(email=email)
        if conflicting.exists():
            return Response({
                "detail": "Your email address does not belong to the provided card."
            }, status=status.HTTP_400_BAD_REQUEST)

        # 2) Determine customer_id: reuse existing for this user+email, or create new
        customer_id = get_or_create_customer_id_for_user(email, request.user)

        # 3) Check if for this customer/email there is already a card with same last4 & exp; if so, treat as existing
        existing_for_user = StripeModel.objects.filter(user=request.user, email=email,
                                                       card_number__endswith=last4,
                                                       exp_month=exp_month,
                                                       exp_year=exp_year).first()
        if existing_for_user:
            # Card already exists for this user/email: if save_card_flag but already saved, error or simply respond?
            if save_card_flag:
                return Response({
                    "detail": "Card already saved. Uncheck save_card or use a different card."
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                # Just attach (simulate) without saving: return existing info
                card_data = {
                    "id": existing_for_user.card_id,
                    "last4": last4,
                    "exp_month": existing_for_user.exp_month,
                    "exp_year": existing_for_user.exp_year,
                    # add other simulated fields if desired:
                    "brand": existing_for_user.card_id.split("_")[0] if "_" in existing_for_user.card_id else None,
                }
                return Response({
                    "message": "Card attached successfully (was already saved).",
                    "customer_id": customer_id,
                    "card_data": card_data
                }, status=status.HTTP_200_OK)

        # 4) Simulate token creation: we won't contact any external API
        #    In real Stripe you'd create a Token, but here just generate a dummy token ID if needed
        token_id = f"tok_{uuid.uuid4().hex}"

        # 5) Simulate card creation: generate a card_id
        new_card_id = generate_card_id()

        # 6) Save to DB if requested
        if save_card_flag:
            try:
                # Create StripeModel entry
                stripe_obj = StripeModel.objects.create(
                    email=email,
                    customer_id=customer_id,
                    card_number=card_number,
                    exp_month=exp_month,
                    exp_year=exp_year,
                    card_id=new_card_id,
                    user=request.user,
                )
                card_data = {
                    "id": stripe_obj.card_id,
                    "last4": last4,
                    "exp_month": stripe_obj.exp_month,
                    "exp_year": stripe_obj.exp_year,
                    # Optionally brand or other fields
                }
                return Response({
                    "message": "Card saved and attached successfully.",
                    "customer_id": customer_id,
                    "card_data": card_data
                }, status=status.HTTP_200_OK)
            except Exception as e:
                # For instance, unique constraints or similar
                return Response({
                    "detail": "Card already in use or database error: " + str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Not saving: just simulate attach, but do not create DB entry
            card_data = {
                "id": new_card_id,
                "last4": last4,
                "exp_month": exp_month,
                "exp_year": exp_year,
            }
            return Response({
                "message": "Card attached successfully (not saved).",
                "customer_id": customer_id,
                "card_data": card_data
            }, status=status.HTTP_200_OK)


class ChargeCustomerView(APIView):
    """
    Simulate charging the customer: always succeed.
    Saves an OrderModel instance just like before.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        print ("request user ",request.user)
        # Required fields: email, amount, name, card_number, address, ordered_item, paid_status, total_price, is_delivered, delivered_at
        required = ["amount", "name", "address", "ordered_item", "total_price"]
        missing = [f for f in required if f not in data]
        if missing:
            pass

        email = data.get("email") or getattr(request.user, 'email', None) or "demo@example.com"
        card_number = str(data.get("card_number", "0000000000000000")).strip()
        last4 = card_number[-4:] if len(card_number) >= 4 else None

        # For demo, allow payment without saved card
        customer_id = f"demo_{uuid.uuid4().hex}"
        try:
            stripe_obj = StripeModel.objects.get(user=request.user, email=email, card_number__endswith=last4)
            customer_id = stripe_obj.customer_id
        except StripeModel.DoesNotExist:
            pass

        # Simulate charge: always succeed.
        charge_id = f"ch_{uuid.uuid4().hex}"
        # Amount: expect numeric; interpret as rupees, simulate in paisa if needed
        try:
            amount_value = float(data["amount"])
        except:
            return Response({"detail": "Invalid amount value."}, status=status.HTTP_400_BAD_REQUEST)

        # Create OrderModel entry
        try:
            new_order = OrderModel.objects.create(
                name=data["name"],
                card_number=card_number,
                address=data["address"],
                ordered_item=data["ordered_item"],
                paid_status=True,
                paid_at=datetime.now(),
                total_price=data["total_price"],
                is_delivered=False,
                delivered_at="",
                user=request.user
            )
        except Exception as e:
            return Response({"detail": "Order saving failed: " + str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save transaction entry (mocked Razorpay)
        Transaction.objects.create(
            user=request.user,
            order=new_order,
            amount=new_order.total_price or amount_value,
            currency='INR',
            provider='razorpay',
            provider_payment_id=charge_id,
            status='SUCCESS',
            notes=f"Simulated payment for order {new_order.id}"
        )

        # Return a response similar to Stripe success
        return Response(
            data={
                "data": {
                    "customer_id": customer_id,
                    "charge_id": charge_id,
                    "message": "Payment Successful (simulated)",
                }
            },
            status=status.HTTP_200_OK
        )


class CreateMockRazorpayOrderView(APIView):
    """
    Create a mock Razorpay order and return order_id to frontend for demo UI.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        amount = request.data.get('amount', 0)
        order_id = f"order_{uuid.uuid4().hex}"
        return Response({
            "id": order_id,
            "amount": amount,
            "currency": "INR",
            "status": "created"
        }, status=status.HTTP_200_OK)


class RetrieveCardView(APIView):
    """
    Retrieve a saved card’s details.
    Expects headers: Customer-Id and Card-Id, matching our simulation.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        customer_id = request.headers.get("Customer-Id")
        card_id = request.headers.get("Card-Id")
        if not customer_id or not card_id:
            return Response({"detail": "Customer-Id and Card-Id headers required."},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            stripe_obj = StripeModel.objects.get(user=request.user, customer_id=customer_id, card_id=card_id)
        except StripeModel.DoesNotExist:
            return Response({"detail": "Card not found."}, status=status.HTTP_404_NOT_FOUND)

        # Build simulated card details
        card_details = {
            "id": stripe_obj.card_id,
            "last4": stripe_obj.card_number[-4:] if stripe_obj.card_number else None,
            "exp_month": stripe_obj.exp_month,
            "exp_year": stripe_obj.exp_year,
            "name_on_card": getattr(stripe_obj, "name_on_card", None),
            "address_city": getattr(stripe_obj, "address_city", None),
            "address_country": getattr(stripe_obj, "address_country", None),
            "address_state": getattr(stripe_obj, "address_state", None),
            "address_zip": getattr(stripe_obj, "address_zip", None),
            # add other fields if StripeModel has them
        }
        return Response(card_details, status=status.HTTP_200_OK)


class CardUpdateView(APIView):
    """
    Update fields of a saved card in StripeModel.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        # Require customer_id and card_id to locate
        customer_id = data.get("customer_id")
        card_id = data.get("card_id")
        if not customer_id or not card_id:
            return Response({"detail": "customer_id and card_id are required."},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            obj = StripeModel.objects.get(user=request.user, customer_id=customer_id, card_id=card_id)
        except StripeModel.DoesNotExist:
            return Response({"detail": "Card not found."}, status=status.HTTP_404_NOT_FOUND)

        # Update allowed fields if provided
        # For example: exp_month, exp_year, name_on_card, address_city, address_country, address_state, address_zip
        updated_fields = []
        if data.get("exp_month"):
            obj.exp_month = data["exp_month"]
            updated_fields.append("exp_month")
        if data.get("exp_year"):
            obj.exp_year = data["exp_year"]
            updated_fields.append("exp_year")
        # Optional fields: adjust according to your StripeModel definition
        if data.get("name_on_card"):
            obj.name_on_card = data["name_on_card"]
            updated_fields.append("name_on_card")
        if data.get("address_city"):
            obj.address_city = data["address_city"]
            updated_fields.append("address_city")
        if data.get("address_country"):
            obj.address_country = data["address_country"]
            updated_fields.append("address_country")
        if data.get("address_state"):
            obj.address_state = data["address_state"]
            updated_fields.append("address_state")
        if data.get("address_zip"):
            obj.address_zip = data["address_zip"]
            updated_fields.append("address_zip")

        if updated_fields:
            obj.save()
            update_card = {
                "id": obj.card_id,
                "last4": obj.card_number[-4:] if obj.card_number else None,
                "exp_month": obj.exp_month,
                "exp_year": obj.exp_year,
                "name_on_card": getattr(obj, "name_on_card", None),
                "address_city": getattr(obj, "address_city", None),
                "address_country": getattr(obj, "address_country", None),
                "address_state": getattr(obj, "address_state", None),
                "address_zip": getattr(obj, "address_zip", None),
            }
            return Response({
                "detail": "Card updated successfully",
                "data": {"Updated Card": update_card},
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "No update fields provided."}, status=status.HTTP_400_BAD_REQUEST)


class DeleteCardView(APIView):
    """
    Delete a saved card from StripeModel. Optionally, if no more cards remain for the customer_id, one could
    treat the customer as deleted, but since we only simulate, we just delete this entry.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        card_number = data.get("card_number")
        customer_id = data.get("customer_id")
        card_id = data.get("card_id")

        # Identify the object to delete. We allow specifying either card_number or both IDs.
        try:
            if customer_id and card_id:
                obj_card = StripeModel.objects.get(user=request.user, customer_id=customer_id, card_id=card_id)
            elif card_number:
                last4 = str(card_number)[-4:]
                obj_card = StripeModel.objects.get(user=request.user, card_number__endswith=last4)
            else:
                return Response({"detail": "Provide card_number or both customer_id and card_id."},
                                status=status.HTTP_400_BAD_REQUEST)
        except StripeModel.DoesNotExist:
            return Response({"detail": "Card not found."}, status=status.HTTP_404_NOT_FOUND)

        # Delete the card entry
        customer_id = obj_card.customer_id
        obj_card.delete()

        # Optionally: if no more cards exist for this customer_id, you could clean up or log it.
        remaining = StripeModel.objects.filter(user=request.user, customer_id=customer_id).exists()
        # If not remaining, you might log that customer object is “deleted” in simulation.
        # But since we don’t store a separate CustomerModel, nothing more to do.

        return Response("Card deleted successfully.", status=status.HTTP_200_OK)

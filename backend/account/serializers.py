from .models import StripeModel, BillingAddress, OrderModel, Profile, OrderItem, OrderStatusHistory
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    admin = serializers.SerializerMethodField(read_only=True)
    role = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "admin", "role"]

    def get_admin(self, obj):
        return obj.is_staff

    def get_role(self, obj):
        try:
            return obj.profile.role
        except Profile.DoesNotExist:
            return None


# creating tokens manually (with user registration we will also create tokens)
class UserRegisterTokenSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "admin", "role", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# list of cards
class CardsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = StripeModel
        fields = "__all__"


# billing address details
class BillingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = BillingAddress
        fields = "__all__"


# all orders list
class AllOrdersListSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    status_history = serializers.SerializerMethodField()

    class Meta:
        model = OrderModel
        fields = "__all__"

    def get_items(self, obj):
        return [
            {
                "name": it.name,
                "quantity": it.quantity,
                "price": str(it.price)
            }
            for it in obj.items.all()
        ]

    def get_status_history(self, obj):
        return [
            {
                "status": sh.status,
                "note": sh.note,
                "changed_at": sh.changed_at
            }
            for sh in obj.status_history.all().order_by('-changed_at')
        ]
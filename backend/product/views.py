from .models import Product
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.decorators import permission_classes
from django.db.models import Q
from datetime import datetime


class ProductView(APIView):

    def get(self, request):
        qs = Product.objects.all()
        category = request.query_params.get('category')
        crop_type = request.query_params.get('crop_type')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        search = request.query_params.get('search')

        if category:
            qs = qs.filter(category__iexact=category)
        if crop_type:
            qs = qs.filter(crop_type__iexact=crop_type)
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(description__icontains=search))

        serializer = ProductSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):

    def get(self, request, pk):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        is_farmer = getattr(getattr(user, 'profile', None), 'role', None) == 'FARMER'
        if not (user.is_staff or is_farmer):
            return Response({"detail": "Only farmers or admins can add products."}, status=status.HTTP_403_FORBIDDEN)

        product = {
            "name": data.get("name"),
            "description": data.get("description", ""),
            "price": data.get("price"),
            "stock": data.get("stock", False),
            "image": data.get("image"),
            "category": data.get("category"),
            "crop_type": data.get("crop_type"),
            "quality": data.get("quality"),
            "rating": data.get("rating"),
            "available_quantity": data.get("available_quantity", 0),
            "seller": user.id,
        }

        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProductDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            if not (request.user.is_staff or product.seller_id == request.user.id):
                return Response({"detail": "Not permitted."}, status=status.HTTP_403_FORBIDDEN)
            product.delete()
            return Response({"detail": "Product successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class ProductEditView(APIView):
    
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(id=pk)
        if not (request.user.is_staff or product.seller_id == request.user.id):
            return Response({"detail": "Not permitted."}, status=status.HTTP_403_FORBIDDEN)
        
        updated_product = {
            "name": data["name"] if data["name"] else product.name,
            "description": data["description"] if data["description"] else product.description,
            "price": data["price"] if data["price"] else product.price,
            "stock": data["stock"],
            "image": data["image"] if data["image"] else product.image,
            "category": data.get("category", product.category),
            "crop_type": data.get("crop_type", product.crop_type),
            "quality": data.get("quality", product.quality),
            "rating": data.get("rating", product.rating),
            "available_quantity": data.get("available_quantity", product.available_quantity),
            "seller": product.seller_id or request.user.id,
        }

        serializer = ProductSerializer(product, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class HarvestAdviceView(APIView):
    """
    Simple AI-like heuristic for sowing/harvest suggestions based on crop type and month.
    Expects query params: crop_type, location (optional), month (1-12 optional)
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        crop_type = request.query_params.get('crop_type', '').lower()
        month = request.query_params.get('month')
        try:
            month = int(month) if month else datetime.now().month
        except Exception:
            month = datetime.now().month

        # Basic heuristics per crop
        advice = {
            'wheat': {
                'sow_months': [10, 11],
                'harvest_months': [3, 4],
                'price_trend': 'stable to rising in Q1'
            },
            'rice': {
                'sow_months': [6, 7],
                'harvest_months': [10, 11],
                'price_trend': 'peaks post-monsoon'
            },
            'maize': {
                'sow_months': [6, 7, 2, 3],
                'harvest_months': [9, 10, 6],
                'price_trend': 'volatile; watch local demand'
            }
        }

        rule = advice.get(crop_type, {
            'sow_months': [6, 7],
            'harvest_months': [10, 11],
            'price_trend': 'seasonal'
        })

        is_good_sow = month in rule['sow_months']
        is_good_harvest = month in rule['harvest_months']

        return Response({
            'crop_type': crop_type or 'unknown',
            'current_month': month,
            'good_to_sow_now': is_good_sow,
            'good_to_harvest_now': is_good_harvest,
            'suggested_sow_months': rule['sow_months'],
            'suggested_harvest_months': rule['harvest_months'],
            'price_insight': rule['price_trend']
        }, status=status.HTTP_200_OK)

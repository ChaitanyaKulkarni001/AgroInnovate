from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price', 'stock', 'image',
            'category', 'crop_type', 'quality', 'rating', 'available_quantity', 'seller',
            'brand', 'origin', 'weight_unit', 'min_order_qty', 'attributes'
        ]

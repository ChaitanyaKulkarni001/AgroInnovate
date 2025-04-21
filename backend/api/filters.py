import django_filters
from .models import *
class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="discounted_price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="discounted_price", lookup_expr='lte')
    original_price = django_filters.NumberFilter(field_name="original_price", lookup_expr='exact')
    min_original_price = django_filters.NumberFilter(field_name="original_price", lookup_expr='gte')
    max_original_price = django_filters.NumberFilter(field_name="original_price", lookup_expr='lte')
    
    created_after = django_filters.DateFilter(field_name="created_at", lookup_expr='gte')
    created_before = django_filters.DateFilter(field_name="created_at", lookup_expr='lte')
    
    expiry_after = django_filters.DateFilter(field_name="product_expiry", lookup_expr='gte')
    expiry_before = django_filters.DateFilter(field_name="product_expiry", lookup_expr='lte')
    
    farmer_name = django_filters.CharFilter(field_name='farmer__username', lookup_expr='icontains')
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    
    udf1 = django_filters.CharFilter(field_name='udf1', lookup_expr='icontains')
    udf2 = django_filters.CharFilter(field_name='udf2', lookup_expr='icontains')
    udf3 = django_filters.CharFilter(field_name='udf3', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = [
            'category', 'unit', 'is_available', 'name',
            'original_price', 'discounted_price', 'product_expiry',
            'udf1', 'udf2', 'udf3'
        ]
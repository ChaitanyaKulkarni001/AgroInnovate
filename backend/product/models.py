from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)
    # New fields for comparison and filtering
    category = models.CharField(max_length=100, null=True, blank=True)
    crop_type = models.CharField(max_length=100, null=True, blank=True)
    quality = models.CharField(max_length=50, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    available_quantity = models.PositiveIntegerField(default=0)
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    brand = models.CharField(max_length=120, null=True, blank=True)
    origin = models.CharField(max_length=120, null=True, blank=True)
    weight_unit = models.CharField(max_length=20, null=True, blank=True, help_text='e.g., kg, g')
    min_order_qty = models.PositiveIntegerField(default=1)
    attributes = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.name
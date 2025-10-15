from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from account.models import Profile
from product.models import Product
from django.db import transaction

class Command(BaseCommand):
    help = 'Seed demo users (farmer, buyer) and products'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        # Users
        farmer, _ = User.objects.get_or_create(username='farmer1', defaults={'email': 'farmer1@example.com'})
        if not farmer.password:
            farmer.set_password('password123')
            farmer.save()
        Profile.objects.get_or_create(user=farmer, defaults={'role': 'FARMER', 'phone_number': '9999999999'})

        buyer, _ = User.objects.get_or_create(username='buyer1', defaults={'email': 'buyer1@example.com'})
        if not buyer.password:
            buyer.set_password('password123')
            buyer.save()
        Profile.objects.get_or_create(user=buyer, defaults={'role': 'BUYER', 'phone_number': '8888888888'})

        # Products
        samples = [
            {
                'name': 'Premium Wheat', 'description': 'High quality wheat', 'price': 1200, 'stock': True,
                'category': 'Grains', 'crop_type': 'Wheat', 'quality': 'A', 'rating': 4.5, 'available_quantity': 100,
                'brand': 'AgriBest', 'origin': 'Punjab', 'weight_unit': 'kg', 'min_order_qty': 10,
                'attributes': {'protein': '12%', 'moisture': '10%'}, 'image': '/images/wheat_flour.jpg'
            },
            {
                'name': 'Organic Rice', 'description': 'Pesticide free', 'price': 1800, 'stock': True,
                'category': 'Grains', 'crop_type': 'Rice', 'quality': 'A+', 'rating': 4.7, 'available_quantity': 200,
                'brand': 'GreenFields', 'origin': 'West Bengal', 'weight_unit': 'kg', 'min_order_qty': 5,
                'attributes': {'broken': '5%', 'whiteness': 'good'}, 'image': '/images/basmati_rice.jpg'
            },
            {
                'name': 'Maize Corn', 'description': 'Animal feed grade', 'price': 900, 'stock': True,
                'category': 'Feed', 'crop_type': 'Maize', 'quality': 'B', 'rating': 4.2, 'available_quantity': 300,
                'brand': 'FeedPro', 'origin': 'Maharashtra', 'weight_unit': 'kg', 'min_order_qty': 20,
                'attributes': {'aflatoxin': 'within limits'}, 'image': '/images/green_capsicum.jpg'
            },
            {
                'name': 'Wild Honey', 'description': 'Natural forest honey', 'price': 650, 'stock': True,
                'category': 'Grocery', 'crop_type': 'Honey', 'quality': 'A', 'rating': 4.8, 'available_quantity': 80,
                'brand': 'ForestGold', 'origin': 'Himalayas', 'weight_unit': 'ml', 'min_order_qty': 2,
                'attributes': {'floral': 'yes'}, 'image': '/images/wild_honey.jpg'
            },
            {
                'name': 'Fresh Milk', 'description': 'Farm fresh cow milk', 'price': 60, 'stock': True,
                'category': 'Dairy', 'crop_type': 'Milk', 'quality': 'A', 'rating': 4.6, 'available_quantity': 500,
                'brand': 'DairyPure', 'origin': 'Local', 'weight_unit': 'L', 'min_order_qty': 1,
                'attributes': {'fat': '3.5%'}, 'image': '/images/fresh_milk.jpg'
            },
            {
                'name': 'Farm Eggs', 'description': 'Free-range eggs', 'price': 120, 'stock': True,
                'category': 'Poultry', 'crop_type': 'Eggs', 'quality': 'A', 'rating': 4.4, 'available_quantity': 400,
                'brand': 'SunnySide', 'origin': 'Local', 'weight_unit': 'dozen', 'min_order_qty': 1,
                'attributes': {'size': 'L'}, 'image': '/images/farm_eggs.jpg'
            },
        ]

        for p in samples:
            obj, created = Product.objects.get_or_create(name=p['name'], defaults={**p, 'seller': farmer})
            if not created:
                for k, v in p.items():
                    setattr(obj, k, v)
                obj.seller = farmer
                obj.save()

        self.stdout.write(self.style.SUCCESS('Seeded demo data: users farmer1/buyer1 (password123), and products with images.'))

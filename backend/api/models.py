from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from geopy.geocoders import Nominatim
import uuid
from taggit.managers import TaggableManager



class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

# class Country(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name
    
# class State(models.Model):
#     name = models.CharField(max_length=100)
#     country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='states')

#     def __str__(self):
#         return f"{self.name} ({self.country.name})"
    
# class City(models.Model):
#     name = models.CharField(max_length=100)
#     state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

#     def __str__(self):
#         return f"{self.name} ({self.state.name})"


#Farmer model
class Farmer(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    profile_image = models.ImageField(upload_to='farmer_profiles/', null=True, blank=True)
    bio = models.TextField(blank=True, null=True)

    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)


    pincode = models.CharField(max_length=10)
    address_line = models.TextField()

    farm_name = models.CharField(max_length=255)
    farm_size = models.DecimalField(max_digits=10, decimal_places=2)
    farm_type = models.CharField(max_length=50, choices=[('Organic', 'Organic'), ('Conventional', 'Conventional')])
    experience_years = models.PositiveIntegerField()
    business_registration_number = models.CharField(max_length=50, blank=True, null=True)

    bank_account_number = models.CharField(max_length=20)
    ifsc_code = models.CharField(max_length=11)
    upi_id = models.CharField(max_length=50, blank=True, null=True)

    id_proof = models.FileField(upload_to='documents/id_proofs/')
    ownership_proof = models.FileField(upload_to='documents/ownership_proofs/')
    is_verified = models.BooleanField(default=False)
    registration_date = models.DateTimeField(auto_now_add=True)
    
    udf1 = models.CharField(null=True, max_length=100)
    udf2 = models.CharField(null=True, max_length=100)
    udf3 = models.CharField(null=True, max_length=100)
    
    #for billing 
    billing_id = models.CharField(max_length=20, unique=True, editable=False, default='')

    def save(self, *args, **kwargs):
        if not self.billing_id:
            self.billing_id = f"FARM-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    #Geolocation saving 
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    #Calculating Geolocation address
    def save(self, *args, **kwargs):
        if not self.latitude and not self.longitude:
            # Only try geocoding if all required address parts are present
            if self.country and self.state and self.city:
                address = f"{self.city}, {self.state}, {self.country}"
                geolocator = Nominatim(user_agent="farmer_app", timeout=10)

                location = geolocator.geocode(address)
                if location:
                    self.latitude = location.latitude
                    self.longitude = location.longitude

        super().save(*args, **kwargs)

    def __str__(self):
        return self.username
    

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this farmer belongs to.',
        related_name="farmer_groups",  # Custom related_name
        related_query_name="farmer",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this farmer.',
        related_name="farmer_permissions",  # Custom related_name
        related_query_name="farmer",
    )


class FarmerReview(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    rating = models.IntegerField()  # 1 to 5
    comment = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

#product model 
class Product(models.Model):
    CATEGORY_CHOICES = [
    ('Vegetable', 'Vegetable'),
    ('Fruit', 'Fruit'),
    ('Grain', 'Grain'),
    ('Dairy', 'Dairy'),
    ('Poultry', 'Poultry'),
    ('Meat', 'Meat'),
    ('Herbs', 'Herbs'),
    ('Honey', 'Honey'),
    ('Beverage', 'Beverage'),
    ('Snack', 'Snack'),
    ('Livestock', 'Livestock'),               # 🐄 Animals like cows, goats, buffaloes
    ('Pet Animal', 'Pet Animal'),             # 🐶 Non-livestock animals like dogs, rabbits
    ('Farm Tool', 'Farm Tool'),               # 🛠️ Tools, ploughs, sprinklers
    ('Machinery', 'Machinery'),               # 🚜 Tractors, tillers, harvesters
    ('Fertilizer', 'Fertilizer'),             # 🌱 Organic/chemical fertilizers
    ('Seed', 'Seed'),                         # 🌾 Any kind of seeds
    ('Handicraft', 'Handicraft'),             # 🧶 Handmade or local crafts by farmers
    ('Other', 'Other'),                       # 🔁 Fallback option
    ]

    UNIT_CHOICES = [
        ('Kg', 'Kg'),
        ('Liter', 'Liter'),
        ('Piece', 'Piece'),
        ('Dozen', 'Dozen'),
        ('Quintal', 'Quintal'),
    ]

    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.FloatField()
    unit = models.CharField(max_length=20, choices=UNIT_CHOICES)
    image1 = models.ImageField(upload_to='product_images/', blank=True, null=True)
    image2 = models.ImageField(upload_to='product_images/', null=True, blank=True)
    is_available = models.BooleanField(default=True)
  
    product_expiry = models.DateField(null=True, blank=True)
    tags = TaggableManager(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    udf1 = models.CharField(null=True, max_length=100)
    udf2 = models.CharField(null=True, max_length=100)
    udf3 = models.CharField(null=True, max_length=100)

    def __str__(self):
        return f"{self.name} by {self.farmer.username}"
    


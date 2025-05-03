from django.db import models
from django.contrib.auth.models import AbstractUser
from geopy.geocoders import Nominatim
import uuid
from taggit.managers import TaggableManager
from django.conf import settings



class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class Country(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class State(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='states')

    def __str__(self):
        return f"{self.name} ({self.country.name})"
    
class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return f"{self.name} ({self.state.name})"

class CustomUser(AbstractUser):
    FARMER   = 'farmer'
    CUSTOMER = 'customer'

    ROLE_CHOICES = [
        (FARMER,   'Farmer'),
        (CUSTOMER, 'Customer'),
    ]

    role          = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone_number  = models.CharField(max_length=15, unique=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    bio           = models.TextField(blank=True, null=True)

    country     = models.ForeignKey('Country', on_delete=models.SET_NULL, null=True, blank=True)
    state       = models.ForeignKey('State',   on_delete=models.SET_NULL, null=True, blank=True)
    city        = models.ForeignKey('City',    on_delete=models.SET_NULL, null=True, blank=True)
    pincode     = models.CharField(max_length=10, blank=True)
    address_line = models.TextField(blank=True)

    # three generic user‑defined fields
    udf1 = models.CharField(max_length=100, blank=True, null=True)
    udf2 = models.CharField(max_length=100, blank=True, null=True)
    udf3 = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

#Farmer model
class FarmerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='farmer_profile')

    farm_name                     = models.CharField(max_length=255)
    farm_size                     = models.DecimalField(max_digits=10, decimal_places=2)
    farm_type                     = models.CharField(max_length=20,choices=[('Organic','Organic'), ('Conventional','Conventional')])
    experience_years              = models.PositiveIntegerField()
    business_registration_number  = models.CharField(max_length=50, blank=True, null=True)
   
    bank_account_number           = models.CharField(max_length=20)
    ifsc_code                     = models.CharField(max_length=11)
    upi_id                        = models.CharField(max_length=50, blank=True, null=True)
    
    id_proof         = models.FileField(upload_to='documents/id_proofs/')
    ownership_proof  = models.FileField(upload_to='documents/ownership_proofs/')
    is_verified      = models.BooleanField(default=False)
    registration_date = models.DateTimeField(auto_now_add=True)

    billing_id = models.CharField(max_length=20, unique=True, editable=False, default='')


  

    #Geolocation saving 
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    #Calculating Geolocation address
    def save(self, *args, **kwargs):
        if not self.billing_id:
            self.billing_id = f"FARM-{uuid.uuid4().hex[:10].upper()}"
        if not self.latitude and not self.longitude:
            if self.user.country and self.user.state and self.user.city:
                address = f"{self.user.city}, {self.user.state}, {self.user.country}"
                geolocator = Nominatim(user_agent="farmer_app", timeout=10)
                location = geolocator.geocode(address)
                if location:
                    self.latitude = location.latitude
                    self.longitude = location.longitude

        super().save(*args, **kwargs)
        def __str__(self):
            return self.username
        

    

class FarmerReview(models.Model):
    farmer   = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.CharField(max_length=100)
    rating   = models.PositiveSmallIntegerField()   # 1–5
    comment  = models.TextField(blank=True, null=True)
    date     = models.DateTimeField(auto_now_add=True)




class CustomerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='customer_profile')

    # Default shipping and billing addresses
    shipping_address_line1 = models.CharField(max_length=255)
    shipping_address_line2 = models.CharField(max_length=255, blank=True)
    shipping_city          = models.ForeignKey('City',   on_delete=models.SET_NULL, null=True)
    shipping_state         = models.ForeignKey('State',  on_delete=models.SET_NULL, null=True)
    shipping_country       = models.ForeignKey('Country',on_delete=models.SET_NULL, null=True)
    shipping_pincode       = models.CharField(max_length=10)

    billing_address_line1 = models.CharField(max_length=255, blank=True)
    billing_address_line2 = models.CharField(max_length=255, blank=True)
    billing_city          = models.ForeignKey('City',    related_name='+', on_delete=models.SET_NULL, null=True, blank=True)
    billing_state         = models.ForeignKey('State',   related_name='+', on_delete=models.SET_NULL, null=True, blank=True)
    billing_country       = models.ForeignKey('Country', related_name='+', on_delete=models.SET_NULL, null=True, blank=True)
    billing_pincode       = models.CharField(max_length=10, blank=True)

    # e‑commerce extras
    loyalty_points    = models.PositiveIntegerField(default=0)
    default_payment_method = models.CharField(max_length=50, blank=True, null=True)
    wishlist          = models.ManyToManyField('Product', blank=True, related_name='wishlisted_by')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    # three generic user‑defined fields
    udf1 = models.CharField(max_length=100, blank=True, null=True)
    udf2 = models.CharField(max_length=100, blank=True, null=True)
    udf3 = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s shopper profile"

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

    farmer = models.ForeignKey(FarmerProfile, on_delete=models.CASCADE, related_name='products')
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
        return f"{self.name} by {self.farmer.user.username}"
    


from django.contrib import admin
from .models import *

admin.site.register(FarmerProfile)
admin.site.register(CustomerProfile)
admin.site.register(Product)
admin.site.register(City)
admin.site.register(Country)
admin.site.register(CustomUser)
admin.site.register(State)
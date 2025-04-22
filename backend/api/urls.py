from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    
    # path('countries/', CountryListView.as_view(), name='country-list'),
    # path('countries/<int:country_id>/states/', StateListView.as_view(), name='state-list'),
    # path('states/<int:state_id>/cities/', CityListView.as_view(), name='city-list'),

    # Auth
    path('register/', RegistrationView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    # Farmers
    path('farmers/', FarmerListCreateAPIView.as_view(), name='farmer-list-create'),
    path('farmers/<int:pk>/', FarmerDetailAPIView.as_view(), name='farmer-detail'),

    # Customers
    path('customers/', CustomerListCreateAPIView.as_view(), name='customer-list-create'),
    path('customers/<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),


    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),


    # 🔹 Top categories for landing page
    path('top-products/', TopMixedProductsView.as_view(), name='top_products'),
    path('top-categories/', TopCategoriesView.as_view(), name='top_categories'),
]

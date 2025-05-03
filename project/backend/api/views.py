from django.shortcuts import render
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import serializers, generics, status, permissions
from rest_framework.authtoken.models import Token


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class RegistrationView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['username'],
                            password=serializer.validated_data['password'])
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)






# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

# For Dynamic Dropdown for Country, state and city 
class CountryListView(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class StateListView(generics.ListAPIView):
    serializer_class = StateSerializer
    
    def get_queryset(self):
        country_id = self.kwargs['country_id']
        return State.objects.filter(country_id=country_id)

class CityListView(generics.ListAPIView):
    serializer_class = CitySerializer
    
    def get_queryset(self):
        state_id = self.kwargs['state_id']
        return City.objects.filter(state_id=state_id)


# 🔹 Farmer Views and Customer views 

class FarmerListCreateAPIView(generics.ListCreateAPIView):
    queryset = FarmerProfile.objects.all()
    serializer_class = FarmerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FarmerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FarmerProfile.objects.all()
    serializer_class = FarmerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class CustomerListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CustomerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]




# 🔹 Product Views
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer


class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter  



# for landing page 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class TopMixedProductsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """
        Returns up to 3 top products per category, mixed from different categories.
        For landing page display.
        """
        categories = Product.objects.values_list('category', flat=True).distinct()
        top_products = []

        for category in categories:
            # Get top 3 products per category based on recency
            products = Product.objects.filter(
                category=category, 
                is_available=True
            ).order_by('-created_at')[:3] 
            
            if products:
                top_products.extend(products)

        # Sort all products by created_at (most recent first), then limit to a reasonable number (e.g., 30)
        top_products = sorted(top_products, key=lambda x: x.created_at, reverse=True)[:30]  # Adjust limit as needed

        serializer = ProductSerializer(top_products, many=True)
        return Response({'top_products': serializer.data})


@method_decorator(csrf_exempt, name='dispatch')
class TopCategoriesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """
        Return all categories (sorted by product count).
        This will be used on the landing page.
        """
        category_counts = (
            Product.objects.values('category')
            .annotate(total=Count('id'))
            .order_by('-total')  
        )

        categories = [entry['category'] for entry in category_counts]

        return Response({
            'top_categories': categories
        })
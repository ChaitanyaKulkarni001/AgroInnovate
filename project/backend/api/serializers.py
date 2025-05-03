from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from rest_framework import serializers
from .models import Country, State, City
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'role', 'phone_number',
                  'profile_image', 'bio', 'country', 'state', 'city',
                  'pincode', 'address_line', 'udf1', 'udf2', 'udf3']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()

        # Create corresponding profile
        if user.role == CustomUser.FARMER:
            FarmerProfile.objects.create(user=user)
        else:
            CustomerProfile.objects.create(user=user)

        return user




class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class FarmerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerReview
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class FarmerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = FarmerProfile
        exclude = []  # include all fields


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CustomerProfile
        exclude = []


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'




class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name', 'country']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'state']

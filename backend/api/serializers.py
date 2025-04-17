from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from rest_framework import serializers
from .models import Country, State, City


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}





# class CountrySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Country
#         fields = ['id', 'name']

# class StateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = State
#         fields = ['id', 'name', 'country']

# class CitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = City
#         fields = ['id', 'name', 'state']

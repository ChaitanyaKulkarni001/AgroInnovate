from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

from rest_framework import generics
from .models import Country, State, City
from .serializers import CountrySerializer, StateSerializer, CitySerializer


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


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

#For Dynamic Dropdown for Country, state and city 
# class CountryListView(generics.ListAPIView):
#     queryset = Country.objects.all()
#     serializer_class = CountrySerializer

# class StateListView(generics.ListAPIView):
#     serializer_class = StateSerializer
    
#     def get_queryset(self):
#         country_id = self.kwargs['country_id']
#         return State.objects.filter(country_id=country_id)

# class CityListView(generics.ListAPIView):
#     serializer_class = CitySerializer
    
#     def get_queryset(self):
#         state_id = self.kwargs['state_id']
#         return City.objects.filter(state_id=state_id)

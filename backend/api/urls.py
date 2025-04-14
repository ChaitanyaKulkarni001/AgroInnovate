from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    
    # path('countries/', CountryListView.as_view(), name='country-list'),
    # path('countries/<int:country_id>/states/', StateListView.as_view(), name='state-list'),
    # path('states/<int:state_id>/cities/', CityListView.as_view(), name='city-list'),
]

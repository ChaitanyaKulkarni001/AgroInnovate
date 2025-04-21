# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, FarmerProfile, ConsumerProfile

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'farmer':
            FarmerProfile.objects.create(user=instance)
        elif instance.role == 'consumer':
            ConsumerProfile.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == 'farmer' and hasattr(instance, 'farmer_profile'):
        instance.farmer_profile.save()
    elif instance.role == 'consumer' and hasattr(instance, 'consumer_profile'):
        instance.consumer_profile.save()

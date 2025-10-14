from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PromoCode(models.Model):
    code = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    discount_percent = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)

    def is_valid_now(self):
        now = timezone.now()
        if not self.active:
            return False
        if self.valid_from and now < self.valid_from:
            return False
        if self.valid_to and now > self.valid_to:
            return False
        return True

    def __str__(self):
        return self.code


class Transaction(models.Model):
    PAYMENT_STATUS_CHOICES = (
        ("CREATED", "Created"),
        ("SUCCESS", "Success"),
        ("FAILED", "Failed"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    order = models.ForeignKey('account.OrderModel', on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    provider = models.CharField(max_length=20, default='razorpay')
    provider_payment_id = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='CREATED')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Txn {self.id} - {self.status} - Rs {self.amount}"

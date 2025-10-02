from django.db import models


class ContactSubmission(models.Model):
    SERVICE_CHOICES = (
        ("Laundry", "Laundry"),
        ("Dry Cleaning", "Dry Cleaning"),
        ("Ironing", "Ironing"),
        ("Other", "Other"),
    )

    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True)
    service = models.CharField(max_length=32, choices=SERVICE_CHOICES)
    address = models.TextField()
    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.name} - {self.service} - {self.phone}"


class RateItem(models.Model):
    CATEGORY_CHOICES = (
        ("men", "Men"),
        ("women", "Women"),
        ("household", "Household"),
        ("footwear", "Footwear"),
    )

    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES)
    item = models.CharField(max_length=255)
    washFold = models.IntegerField(null=True, blank=True)
    dryClean = models.IntegerField(null=True, blank=True)
    iron = models.IntegerField(null=True, blank=True)
    steamIron = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ["category", "item"]

    def __str__(self) -> str:
        return f"{self.category} - {self.item}"


class PackagePlan(models.Model):
    name = models.CharField(max_length=100)
    garments = models.IntegerField()
    turnaround = models.CharField(max_length=50)
    price = models.IntegerField()
    features = models.TextField(help_text="One feature per line")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["price"]

    def feature_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]

    def __str__(self) -> str:
        return f"{self.name} (₹{self.price}/mo)"


class Order(models.Model):
    STATUS_CHOICES = (
        ("received", "Received"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    wa_number = models.CharField(max_length=32, help_text="WhatsApp user phone")
    wa_name = models.CharField(max_length=255, blank=True)
    message_text = models.TextField(blank=True)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="received")
    raw_payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.wa_number} - {self.status} - {self.created_at:%Y-%m-%d %H:%M}"

from django.db import models

# Create your models here.

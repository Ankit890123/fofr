from django.contrib import admin
from .models import ContactSubmission, RateItem, PackagePlan, Order


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "service", "created_at")
    list_filter = ("service", "created_at")
    search_fields = ("name", "phone", "email", "address", "message")


@admin.register(RateItem)
class RateItemAdmin(admin.ModelAdmin):
    list_display = ("category", "item", "washFold", "dryClean", "iron", "steamIron")
    list_filter = ("category",)
    search_fields = ("item",)


@admin.register(PackagePlan)
class PackagePlanAdmin(admin.ModelAdmin):
    list_display = ("name", "garments", "turnaround", "price")
    search_fields = ("name",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("wa_number", "wa_name", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("wa_number", "wa_name", "message_text")

# Register your models here.

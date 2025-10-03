from django.urls import path
from .views import ping, contact, whatsapp_link, pricing, site_info, whatsapp_webhook


urlpatterns = [
    path("ping", ping, name="ping"),
    path("contact", contact, name="contact"),
    path("whatsapp-link", whatsapp_link, name="whatsapp-link"),
    path("whatsapp-webhook", whatsapp_webhook, name="whatsapp-webhook"),
    path("pricing", pricing, name="pricing"),
    path("site-info", site_info, name="site-info"),
]






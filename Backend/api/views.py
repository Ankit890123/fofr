from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import ContactSerializer
from .models import ContactSubmission, Order
from django.conf import settings
from urllib.parse import quote
from django.core.mail import send_mail


@api_view(["GET"])
def ping(request):
    return Response({"message": "pong"})


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data
        ContactSubmission.objects.create(
            name=data.get("name"),
            phone=data.get("phone"),
            email=data.get("email", ""),
            service=data.get("service"),
            address=data.get("address"),
            message=data.get("message", ""),
        )
        # Send notification email if configured
        to_email = getattr(settings, "CONTACT_NOTIFY_EMAIL", "")
        if to_email:
            subject = f"New enquiry for {data.get('service')} - {data.get('name')}"
            body = (
                f"Name: {data.get('name')}\n"
                f"Phone: {data.get('phone')}\n"
                f"Email: {data.get('email') or '-'}\n"
                f"Service: {data.get('service')}\n"
                f"Address: {data.get('address')}\n"
                f"Message: {data.get('message') or '-'}\n"
            )
            try:
                send_mail(subject, body, getattr(settings, "DEFAULT_FROM_EMAIL", None), [to_email], fail_silently=True)
            except Exception:
                pass
        return Response({"ok": True, "received": data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def whatsapp_link(request):
    text = request.GET.get("text", "")
    number = getattr(settings, "WHATSAPP_NUMBER", "")
    # wa.me expects no + and no spaces
    url = f"https://wa.me/{number}?text={quote(text)}" if number else ""
    return Response({"url": url, "number": number})


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def pricing(request):
    from .models import RateItem, PackagePlan

    def serialize_rate(qs):
        return [
            {
                "item": r.item,
                "washFold": r.washFold,
                "dryClean": r.dryClean,
                "iron": r.iron,
                "steamIron": r.steamIron,
            }
            for r in qs
        ]

    men = serialize_rate(RateItem.objects.filter(category="men"))
    women = serialize_rate(RateItem.objects.filter(category="women"))
    household = serialize_rate(RateItem.objects.filter(category="household"))
    footwear = serialize_rate(RateItem.objects.filter(category="footwear"))

    packages = [
        {
            "name": p.name,
            "garments": p.garments,
            "turnaround": p.turnaround,
            "price": p.price,
            "features": p.feature_list(),
        }
        for p in PackagePlan.objects.all()
    ]

    # If DB empty, return existing hardcoded structure (frontend still has fallback too)
    if not (men or women or household or footwear or packages):
        return Response({
            "men": [], "women": [], "household": [], "footwear": [], "packages": []
        })

    return Response({
        "men": men,
        "women": women,
        "household": household,
        "footwear": footwear,
        "packages": packages,
    })


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def site_info(request):
    data = {
        "name": getattr(settings, "COMPANY_NAME", "Foldfresh"),
        "tagline": "Premium Laundry & Dry Cleaning",
        "whatsappNumber": getattr(settings, "WHATSAPP_NUMBER", ""),
        "phoneDisplay": getattr(settings, "PHONE_DISPLAY", ""),
        "phoneNumber": getattr(settings, "PHONE_NUMBER", ""),
        "instagram": getattr(settings, "INSTAGRAM_HANDLE", ""),
    }
    return Response(data)

@api_view(["GET", "POST"])
@permission_classes([permissions.AllowAny])
def whatsapp_webhook(request):
    # Verification (Meta WhatsApp Cloud API style)
    if request.method == "GET":
        mode = request.GET.get("hub.mode")
        token = request.GET.get("hub.verify_token")
        challenge = request.GET.get("hub.challenge")
        verify_token = getattr(settings, "WHATSAPP_VERIFY_TOKEN", None)
        if mode == "subscribe" and token and verify_token and token == verify_token:
            return Response(challenge)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # Receive messages
    payload = request.data
    try:
        entries = payload.get("entry", [])
        for entry in entries:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                messages = value.get("messages", [])
                contacts = value.get("contacts", [])
                wa_name = contacts[0].get("profile", {}).get("name", "") if contacts else ""
                for m in messages:
                    if m.get("type") == "text":
                        wa_number = m.get("from", "")
                        text = m.get("text", {}).get("body", "")
                        Order.objects.create(
                            wa_number=wa_number,
                            wa_name=wa_name,
                            message_text=text,
                            raw_payload=payload,
                        )
    except Exception:
        pass
    return Response({"ok": True})

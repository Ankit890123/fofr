from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(min_length=2)
    phone = serializers.CharField(min_length=10)
    email = serializers.EmailField(allow_blank=True, required=False)
    service = serializers.ChoiceField(choices=["Laundry", "Dry Cleaning", "Ironing", "Other"])
    address = serializers.CharField(min_length=6)
    message = serializers.CharField(allow_blank=True, required=False)




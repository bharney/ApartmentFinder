from rest_framework import serializers

from .models import List, Apartment

class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List

class ApartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Apartment
        
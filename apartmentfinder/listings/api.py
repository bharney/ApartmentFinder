from rest_framework.generics import ListAPIView

from .serializers import ListSerializer, ApartmentSerializer
from .models import List, Apartment

class ListApi(ListAPIView):
    ##queryset = List.object.all()
    serializer_class = ListSerializer

class ApartmentApi(ListAPIView):
    ##queryset = Apartment.object.all()
    serializer_class = ApartmentSerializer
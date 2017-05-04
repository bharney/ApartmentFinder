from django.conf.urls import url

from .api import ApartmentApi, ListApi

urlpatterns = [
    url(r'^lists$', ListApi.as_view()),
    url(r'^apartment$', ApartmentApi.as_view()),
]

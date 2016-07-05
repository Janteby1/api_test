from django.conf.urls import include, url
from django.contrib import admin
from api import views #gets all our view functions

urlpatterns = [
    url(r'^$', views.Index.as_view(), name='index'),
    url(r'^calc$', views.Calc.as_view(), name='calc'),
]


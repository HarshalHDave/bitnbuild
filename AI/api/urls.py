from django.urls import path
from api import views

urlpatterns = [
    path('',views.index_page),
    path('forecast', views.forecast, name='forecast')
]
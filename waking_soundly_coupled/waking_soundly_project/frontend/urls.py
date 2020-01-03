from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('addmusic/', views.index),
    path('login/', views.index),
    path('newuser/', views.index),
    path('editmusic/<int:songid>/', views.edit_song)
]

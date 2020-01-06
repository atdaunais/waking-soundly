from rest_framework import routers
from .api import MainSongViewSet, TransitionViewSet, UserSongViewSet
from .models import UserSong
from django.urls import path, include

router = routers.DefaultRouter()
router.register('main_song', MainSongViewSet)
router.register('transition', TransitionViewSet)
router.register('user_song', UserSongViewSet, basename="UserSong")

urlpatterns = [
    path('', include(router.urls))
]

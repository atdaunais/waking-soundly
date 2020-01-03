from rest_framework import serializers
from .models import MainSong, UserSong, Transition


class MainSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainSong
        fields = "__all__"


class TransitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transition
        fields = "__all__"


class UserSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSong
        fields = "__all__"

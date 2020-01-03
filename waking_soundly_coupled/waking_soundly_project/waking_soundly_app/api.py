from .models import MainSong, Transition, UserSong
from rest_framework import viewsets, permissions
from .serializers import MainSongSerializer, TransitionSerializer, UserSongSerializer


class MainSongViewSet(viewsets.ModelViewSet):
    queryset = MainSong.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MainSongSerializer


class TransitionViewSet(viewsets.ModelViewSet):
    queryset = Transition.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TransitionSerializer


# class UserSongViewSet(viewsets.ModelViewSet):
#     queryset = UserSong.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = UserSongSerializer


class UserSongViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSongSerializer

    def get_queryset(self):
        return self.request.user.userSongs.all()

    # allows to save the owner of the song added
    def perform_create(self, serializer):
        serializer.save(byUser=self.request.user)

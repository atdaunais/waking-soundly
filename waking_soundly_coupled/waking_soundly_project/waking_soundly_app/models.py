from django.db import models
from django.contrib.auth.models import User


class MainSong(models.Model):
    songURL = models.CharField(max_length=3000)
    key = models.CharField(max_length=10)


class Transition(models.Model):
    songURL = models.CharField(max_length=3000)
    startKey = models.CharField(max_length=10)
    endKey = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.startKey} - {self.endKey}"


class UserSong(models.Model):
    songURL = models.CharField(max_length=3000)
    key = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    byUser = models.ForeignKey(User, related_name="userSongs", on_delete=models.CASCADE, null=True)

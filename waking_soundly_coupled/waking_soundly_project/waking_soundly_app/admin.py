from django.contrib import admin
from .models import MainSong, Transition, UserSong

# Register your models here.
admin.site.register(MainSong)
admin.site.register(Transition)
admin.site.register(UserSong)

from django.shortcuts import render


def index(req):
    return render(req, 'frontend/index.html')


def edit_song(req, songid):
    return render(req, 'frontend/index.html')

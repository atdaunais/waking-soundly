# Generated by Django 3.0.1 on 2019-12-20 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MainSongModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('songURL', models.CharField(max_length=3000)),
                ('key', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='TransitionModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('songURL', models.CharField(max_length=3000)),
                ('startKey', models.CharField(max_length=10)),
                ('endKey', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='UserSongModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('songURL', models.CharField(max_length=3000)),
                ('key', models.CharField(max_length=10)),
            ],
        ),
    ]

# Generated by Django 3.0.1 on 2019-12-21 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('waking_soundly_app', '0002_auto_20191220_1552'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersong',
            name='name',
            field=models.CharField(default='my song', max_length=100),
            preserve_default=False,
        ),
    ]

# Generated by Django 4.1.7 on 2023-04-03 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]

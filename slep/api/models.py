from django.db import models


class SignLanguage(models.Model):
    title = models.TextField()
    alternativeTitle = models.TextField()
    language = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    subDescription = models.TextField(blank=True, null=True)
    referenceIdentifier = models.TextField(blank=True, null=True)

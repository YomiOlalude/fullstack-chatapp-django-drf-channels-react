from pathlib import PurePath

from django.conf import settings
from django.db import models
from django.shortcuts import get_object_or_404
from server.validators import validate_icon_image_size


def category_icon_upload_path(obj, filename):
    return str(PurePath(obj.get_upload_to_path(), filename))


def server_icon_upload_path(obj, filename):
    return str(PurePath(obj.get_upload_to_icon_path(), filename))


def server_banner_upload_path(obj, filename):
    return str(PurePath(obj.get_upload_to_banner_path(), filename))


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(
        null=True,
        blank=True,
        upload_to=category_icon_upload_path,
        validators=[validate_icon_image_size],
    )

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        
        if self.id:
            existing = get_object_or_404(Category, id=self.id)

            if existing.icon != self.icon:
                existing.icon.delete(save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_upload_to_path(self):
        return str(PurePath(str(self.id), "category-icon"))

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="servers"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="servers"
    )
    description = models.CharField(max_length=250, blank=True, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)

    banner = models.ImageField(
        upload_to=server_banner_upload_path,
        blank=True,
        null=True,
    )
    icon = models.ImageField(
        upload_to=server_icon_upload_path,
        blank=True,
        null=True,
        validators=[validate_icon_image_size],
    )

    def __str__(self):
        return f"{self.name}-{self.id}"

    def save(self, *args, **kwargs):
        self.name = self.name.lower()

        if self.id:
            existing = get_object_or_404(Server, id=self.id)

            if existing.icon != self.icon:
                existing.icon.delete(save=False)

            if existing.banner != self.banner:
                existing.banner.delete(save=False)
        super().save(*args, **kwargs)

    def get_upload_to_banner_path(self):
        return str(PurePath(str(self.id), "server-banner"))

    def get_upload_to_icon_path(self):
        return str(PurePath(str(self.id), "server-icon"))


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channels"
    )
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channels"
    )

    def __str__(self):
        return self.name

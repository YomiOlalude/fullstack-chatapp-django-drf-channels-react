# Generated by Django 4.2.2 on 2023-06-18 00:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import server.models
import server.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "icon",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to=server.models.category_icon_upload_path,
                        validators=[server.validators.validate_icon_image_size],
                    ),
                ),
            ],
            options={
                "verbose_name": "Category",
                "verbose_name_plural": "Categories",
            },
        ),
        migrations.CreateModel(
            name="Server",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "description",
                    models.CharField(blank=True, max_length=250, null=True),
                ),
                (
                    "banner",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=server.models.server_banner_upload_path,
                    ),
                ),
                (
                    "icon",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=server.models.server_icon_upload_path,
                        validators=[server.validators.validate_icon_image_size],
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="servers",
                        to="server.category",
                    ),
                ),
                ("members", models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="servers",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Channel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("topic", models.CharField(max_length=100)),
                (
                    "banner",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=server.models.server_banner_upload_path,
                    ),
                ),
                (
                    "icon",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=server.models.server_icon_upload_path,
                        validators=[server.validators.validate_icon_image_size],
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="channels",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "server",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="channels",
                        to="server.server",
                    ),
                ),
            ],
        ),
    ]

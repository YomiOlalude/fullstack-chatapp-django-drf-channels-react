from django.core.exceptions import ValidationError
from PIL import Image
import os


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 1000 or img.height > 1000:
                raise ValidationError(
                    f"The maximum allowed dimension for the image is 70x70. Your image is {img.width}x{img.height}."
                )
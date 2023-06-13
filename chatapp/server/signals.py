from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from server.models import Category, Channel, Server


@receiver(pre_delete, sender=Category)
def pre_delete_category(sender, instance=None, **kwargs):
    icon = instance.icon

    if icon:
        icon.delete(save=False)


@receiver(pre_delete, sender=Server)
def pre_delete_category(sender, instance=None, **kwargs):
    icon = instance.icon
    banner = banner.icon

    if icon:
        icon.delete(save=False)

    if banner:
        banner.delete(save=False)

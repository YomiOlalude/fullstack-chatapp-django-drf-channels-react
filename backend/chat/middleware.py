from jwt.exceptions import DecodeError
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken


@database_sync_to_async
def get_user(scope):
    model = get_user_model()
    token = scope["token"]

    try:
        if token:
            decoded_token = AccessToken(token)
            user_id = decoded_token["user_id"]
            return model.objects.get(id=user_id)
        return AnonymousUser()
    except (DecodeError, model.DoesNotExist):
        return AnonymousUser()


class JWTAuthMiddleware(object):
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        headers = dict(scope["headers"])

        cookie_str = headers.get(b"cookie", b"").decode("utf-8")
        cookies = dict(cookie.split("=") for cookie in cookie_str.split("; "))

        access_token = cookies.get("access_token")

        scope["token"] = access_token
        scope["user"] = await get_user(scope)

        await self.app(scope, receive, send)

from accounts.models import Account
from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["username"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_id"] = self.user.id
        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        request = self.context.get('request')
        attrs["refresh"] = request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_TOKEN_NAME'])
     
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken('Invalid refresh token')
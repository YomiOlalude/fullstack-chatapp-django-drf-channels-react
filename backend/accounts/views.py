from accounts.models import Account
from accounts.schemas import account_list_docs
from accounts.serializers import (
    AccountSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)
from django.conf import settings
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]

    @account_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = self.queryset.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)


class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):
        refresh_token = response.data.get("refresh")
        access_token = response.data.get("access")

        if refresh_token:
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

            del response.data["refresh"]

        if access_token:
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

            del response.data["access"]

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

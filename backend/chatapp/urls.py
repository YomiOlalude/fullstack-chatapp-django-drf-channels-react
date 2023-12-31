from accounts.views import (
    AccountViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogoutAPIView,
    SignUpView,
)
from chat.consumer import ChatConsumer
from chat.views import MessageViewSet
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import CategoryViewSet, ServerViewSet, ServerMembershipViewSet

router = DefaultRouter()

router.register("api/server/select", ServerViewSet)
router.register("api/server/category", CategoryViewSet)
router.register("api/messages", MessageViewSet, basename="message")
router.register("api/account", AccountViewSet, basename="user")
router.register(
    r"api/membership/(?P<server_id>\d+)/membership",
    ServerMembershipViewSet,
    basename="server-membership",
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/schema/ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("api/signup/", SignUpView.as_view(), name="signup"),
    path("api/logout/", LogoutAPIView.as_view(), name="logout"),
] + router.urls

websocket_urlpatterns = [
    path("<str:server_id>/<str:channel_id>/", ChatConsumer.as_asgi()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

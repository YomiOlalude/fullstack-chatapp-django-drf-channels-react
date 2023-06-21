from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework.routers import DefaultRouter
from server.views import ServerViewSet, CategoryViewSet
from django.conf.urls.static import static
from chat.consumer import ChatConsumer

router = DefaultRouter()
router.register("api/server/select", ServerViewSet)
router.register("api/server/category", CategoryViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/schema/ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
] + router.urls

websocket_urlpatterns = [
    path("ws/chat/", ChatConsumer.as_asgi()),
]

if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.urls import path, include
from rest_framework import routers
from .views import GameFourViewSet, PlayerViewSet, GameFourEntryViewSet, UserFromTokenViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('GameFour', GameFourViewSet)
router.register('Player', PlayerViewSet)
router.register('GameFourEntry', GameFourEntryViewSet)
router.register('user-from-token', UserFromTokenViewSet)
router.register('User', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
]

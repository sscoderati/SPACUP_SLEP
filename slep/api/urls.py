from django.urls import path, include
from ninja import NinjaAPI
from ninja.security import django_auth
from api.routers.auth_api import router as auth_router

api = NinjaAPI(csrf=True)

api.add_router('/auth/', auth_router, auth=django_auth)


urlpatterns = [
    path('', api.urls)
]

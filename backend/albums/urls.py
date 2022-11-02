from django.urls import path

from . import views

urlpatterns = [
    path("", views.get_images, name="images"),
    path("create/", views.create_image, name="create")
]
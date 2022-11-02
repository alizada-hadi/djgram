from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("register/", views.register, name="register"),
    path("profile/update/", views.update_profile, name="update_profile")
]
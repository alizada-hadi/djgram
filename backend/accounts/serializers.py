from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'date_joined',
            'phone',
            'address',
            'photo',
            'isAdmin'
        ]

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'date_joined',
            'phone',
            'address',
            'photo',
            'isAdmin',
            'token'
        ]

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
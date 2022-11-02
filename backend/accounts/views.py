from django.shortcuts import render
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data =super().validate(attrs)
        serializer=  UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register(request):
    data = request.data

    email = data['email']
    username = data['username']
    password = data['password']
    password2 = data['password2']

    if User.objects.filter(email=email).exists():
        return Response({"message" : "User with this email already exists "})
    if password != password2:
        return Response({"message" : "Passwords do not match "})

    if len(password) < 6:
        return Response({"message" : "A strong password contains at least 6 characters "})
    else:
        user = User.objects.create_user(
            email=email, 
            username=username,
            password=password
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data

    email = data['email']
    username = data['username']
    first_name = data['first_name']
    last_name = data['last_name']
    phone = data['phone']
    address = data['address']
    photo = request.FILES.get("photo")

    user.email = email
    user.username = username
    user.first_name = first_name
    user.last_name = last_name
    user.phone = phone
    user.address  = address
    user.photo = photo

    user.save()

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


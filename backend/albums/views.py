from django.shortcuts import render
from .serializers import AlbumSerializer
from .models import Album
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_images(request):
    user = request.user
    images = Album.objects.filter(user=user).order_by('-created_at')
    serializer = AlbumSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_image(request):
    user = request.user
    data = request.data
    image = request.FILES.get("image")
    obj = Album.objects.create(user=user, url=image)
    serializer = AlbumSerializer(obj, many=False)
    return Response(serializer.data)
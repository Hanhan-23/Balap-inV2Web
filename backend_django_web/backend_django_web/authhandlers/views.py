from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Pemerintah
from .serializers import PemerintahSerializer
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .jwt_utils import generate_access_token, generate_refresh_token
import jwt
from .. import settings

@api_view(['POST'])
def pemerintahBuatAkun(request):
    if request.method == 'POST':
        email = request.data.get('email')

        if Pemerintah.objects.filter(email=email).count() > 0:
            return Response({
                'status': 'failed',
                'message': 'email_sudah_terdaftar'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializers = PemerintahSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({
                'status': 'success',
                'message': 'Akun berhasil dibuat'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'status': 'failed',
            'message': 'Data tidak valid',
            'errors': serializers.errors
        }, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def pemerintahLoginAkun(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        pemerintah = Pemerintah.objects.get(email=email)
    except Pemerintah.DoesNotExist:
        return Response({'status': 'invalid_account'}, status=status.HTTP_401_UNAUTHORIZED)

    if check_password(password, pemerintah.password):
        access_token = generate_access_token(pemerintah.id)
        refresh_token = generate_refresh_token(pemerintah.id)

        return Response({
            'status': 'login_success',
            'refresh_token': refresh_token,
            'access_token': access_token,
            'status_pemerintah': pemerintah.status,
        }, status=status.HTTP_200_OK)

    return Response({'status': 'password_salah'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def refresh_token_view(request):
    auth_header = request.headers.get('Authorization')
    if auth_header is None or not auth_header.startswith('Bearer '):
        return Response({'error': 'Authorization header missing or invalid'}, status=status.HTTP_400_BAD_REQUEST)

    refresh_token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']

        new_access_token = generate_access_token(user_id)

        return Response({
            'access_token': new_access_token
        }, status=status.HTTP_200_OK)

    except jwt.ExpiredSignatureError:
        return Response({'error': 'Refresh token expired'}, status=status.HTTP_401_UNAUTHORIZED)
    except jwt.InvalidTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def getAkunPemerintah(request, id):
    try:
        pemerintah = Pemerintah.objects.get(id=id)
        serializer = PemerintahSerializer(pemerintah)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Pemerintah.DoesNotExist:
        return Response({'error': 'Pemerintah tidak ditemukan'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['PUT'])
def updateAkunPemerintah(request, id):
    try:
        pemerintah = Pemerintah.objects.get(id=id)
    except Pemerintah.DoesNotExist:
        return Response({'error': 'Akun tidak ditemukan'}, status=status.HTTP_404_NOT_FOUND)

    serializer = PemerintahSerializer(pemerintah, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Akun berhasil diperbarui'})
    
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

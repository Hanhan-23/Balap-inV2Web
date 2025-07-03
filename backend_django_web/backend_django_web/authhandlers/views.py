from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Pemerintah
from .serializers import PemerintahSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
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

@api_view(['GET'])
def pemerintahMe(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return Response({'error': 'Authorization header missing'}, status=401)

    try:
        token_type, token = auth_header.split()
        if token_type.lower() != 'bearer':
            return Response({'error': 'Invalid token type'}, status=401)

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        pemerintah_id = payload.get('user_id')

        pemerintah = Pemerintah.objects.get(id=pemerintah_id)

        return Response({
            'id': str(pemerintah['id']),
            'nama_lengkap': pemerintah['nama_lengkap'],
            'email': pemerintah['email'],
            'no_pegawai': pemerintah['no_pegawai'],
            'no_telp': pemerintah['no_telp'],
            # 'password': pemerintah['password'],
            'status': pemerintah['status'],
            'tgl_pemerintah': pemerintah['tgl_pemerintah'],
        })

    except Exception as e:
        return Response({'error': str(e)}, status=401)

# handle update
@api_view(['PUT'])
def update_pemerintah(request, id):
    try:
        pemerintah = Pemerintah.objects.get(id=id)
    except Pemerintah.DoesNotExist:
        return Response({"error": "Data tidak ditemukan"}, status=404)

    data = request.data

    # Ambil nilai baru dari request
    nama_lengkap = data.get('nama_lengkap')
    no_telp = data.get('no_telp')
    email = data.get('email')
    password_lama = data.get('password_lama')
    password_baru = data.get('password_baru')
    konfirmasi_password = data.get('konfirmasi_password')

    # Validasi password jika diubah
    if password_lama or password_baru or konfirmasi_password:
        if not (password_lama and password_baru and konfirmasi_password):
            return Response({'error': 'Harap isi semua kolom password untuk mengganti password'}, status=400)
        if not check_password(password_lama, pemerintah.password):
            return Response({'error': 'Password lama salah'}, status=400)
        if password_baru != konfirmasi_password:
            return Response({'error': 'Password baru dan konfirmasi tidak cocok'}, status=400)
        pemerintah.password = make_password(password_baru)

    # Update field lain
    if nama_lengkap:
        pemerintah.nama_lengkap = nama_lengkap
    if no_telp:
        pemerintah.no_telp = no_telp
    if email:
        pemerintah.email = email

    pemerintah.save()
    return Response({"message": "Profil berhasil diperbarui"}, status=200)

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

# ambil seluruh list data akun
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

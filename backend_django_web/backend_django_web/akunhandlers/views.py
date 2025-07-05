from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..authhandlers.auth_utils import jwt_required
from ..authhandlers.models import Pemerintah
from django.contrib.auth.hashers import make_password, check_password

@api_view(['GET'])
def cardAkunPemerintah(request):
    if request.method == 'GET':
        search_query = request.GET.get('search', '')

        if search_query:
            laporan = list(
                Pemerintah.objects(
                    __raw__={
                        '$or': [
                            {'nama_lengkap': {'$regex': search_query, '$options': 'i'}},
                            {'email': {'$regex': search_query, '$options': 'i'}},
                            {'no_pegawai': {'$regex': search_query, '$options': 'i'}},
                            {'no_telp': {'$regex': search_query, '$options': 'i'}},
                            {'tgl_pemerintah': {'$regex': search_query, '$options': 'i'}},
                            {'status': {'$regex': search_query, '$options': 'i'}},
                        ]
                    }
                )
            )
        else:
            laporan = list(Pemerintah.objects())

        result = []
        for l in laporan:
            result.append({
                'id': str(l.id),
                'nama_lengkap': l.nama_lengkap,
                'email': l.email,
                'no_pegawai': l.no_pegawai,
                'no_telp': l.no_telp,
                'tgl_pemerintah': l.tgl_pemerintah,
                'status': l.status,
            })

        return Response(result)
    
@api_view(['PUT'])
def toggleStatusPemerintah(request, id):
    if request.method == 'PUT':
        try:
            laporan = Pemerintah.objects.get(id=str(id))

            if laporan.status == 'belum_verif':
                new_status = 'verif'
                message = 'Status berhasil diubah menjadi diverifikasi'
            elif laporan.status == 'verif':
                new_status = 'belum_verif'
                message = 'Status berhasil diubah menjadi belum diverifikasi'
            else:
                return Response({'message': 'Status tidak dapat diubah. Hanya bisa toggle antara selesai dan disembunyikan.'}, status=400)

            Pemerintah.objects(id=str(id)).update(set__status=new_status)

            return Response({'message': message, 'status_baru': new_status})

        except Pemerintah.DoesNotExist:
            return Response({'message': 'Laporan tidak ditemukan'}, status=404)
        except Exception as e:
            return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)
        
@api_view(['PUT'])
def updateAkunPemerintah(request, id):
    if request.method == 'PUT':
        try:
            pemerintah = Pemerintah.objects.get(id=str(id))
            data = request.data
            update_fields = {}

            # Update field profil
            if 'nama_lengkap' in data:
                update_fields['set__nama_lengkap'] = data['nama_lengkap']
            if 'email' in data:
                # TODO: Cek email tidak duplikat!
                update_fields['set__email'] = data['email']
            if 'no_pegawai' in data:
                update_fields['set__no_pegawai'] = data['no_pegawai']
            if 'no_telp' in data:
                update_fields['set__no_telp'] = data['no_telp']

            # Update password jika dua-duanya dikirim
            old_password = data.get('old_password')
            new_password = data.get('new_password')
            if old_password and new_password:
                if check_password(old_password, pemerintah.password):
                    update_fields['set__password'] = make_password(new_password)
                else:
                    return Response({'message': 'Password lama tidak sesuai'}, status=400)
            elif old_password or new_password:
                return Response({'message': 'Kedua field old_password dan new_password harus dikirim untuk update password'}, status=400)

            if not update_fields:
                return Response({'message': 'Tidak ada field yang diupdate'}, status=400)

            Pemerintah.objects(id=str(id)).update(**update_fields)

            return Response({'message': 'Akun berhasil diupdate', 'updated_fields': list(update_fields.keys())})

        except Pemerintah.DoesNotExist:
            return Response({'message': 'Akun pemerintah tidak ditemukan'}, status=404)
        except Exception as e:
            return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..authhandlers.auth_utils import jwt_required
from ..appsgenerals.models import LaporanModel
from bson import ObjectId


@api_view(['GET'])
def cardLaporan(request):
    if request.method == 'GET':
        search_query = request.GET.get('search', '')

        if search_query:
            laporan = list(
                LaporanModel.objects(
                    __raw__={
                        '$or': [
                            {'judul': {'$regex': search_query, '$options': 'i'}},
                            {'id_peta.alamat': {'$regex': search_query, '$options': 'i'}}
                        ]
                    }
                )
            )
        else:
            laporan = list(LaporanModel.objects())

        result = []
        for l in laporan:
            result.append({
                'id': str(l.id),
                'gambar': l.gambar,
                'judul': l.judul,
                'jenis': l.jenis,
                'cuaca': l.cuaca,
                'persentase': l.persentase,
                'status': l.status,
                'tgl_lapor': l.tgl_lapor,
                'alamat': l.id_peta['alamat'] if l.id_peta else None, 
            })

        return Response(result)

@api_view(['GET'])
def getDetailLaporan(request, id):
    if request.method == 'GET':
        try:
            laporan = LaporanModel.objects.get(id=ObjectId(id))

            result = {
                'id': str(laporan.id),
                'judul': laporan.judul,
                'jenis': laporan.jenis,
                'deskripsi': laporan.deskripsi,
                'gambar': laporan.gambar,
                'persentase': laporan.persentase,
                'cuaca': laporan.cuaca,
                'status': laporan.status,
                'tgl_lapor': laporan.tgl_lapor,
                'cluster': laporan.cluster,
                'id_masyarakat': str(laporan.id_masyarakat),
                'alamat': laporan.id_peta['alamat'] if laporan.id_peta else None,
                'jalan': laporan.id_peta['jalan'] if laporan.id_peta else None,
                'latitude': laporan.id_peta['latitude'] if laporan.id_peta else None,
                'longitude': laporan.id_peta['longitude'] if laporan.id_peta else None,
            }

            return Response(result)

        except LaporanModel.DoesNotExist:
            return Response({'message': 'Laporan tidak ditemukan'}, status=404)
        
@api_view(['PUT'])
def toggleStatusLaporan(request, id):
    if request.method == 'PUT':
        try:
            laporan = LaporanModel.objects.get(id=str(id))

            if laporan.status == 'selesai':
                new_status = 'disembunyikan'
                message = 'Status berhasil diubah menjadi disembunyikan'
            elif laporan.status == 'disembunyikan':
                new_status = 'selesai'
                message = 'Status berhasil diubah menjadi selesai'
            else:
                return Response({'message': 'Status tidak dapat diubah. Hanya bisa toggle antara selesai dan disembunyikan.'}, status=400)

            LaporanModel.objects(id=str(id)).update(set__status=new_status)

            return Response({'message': message, 'status_baru': new_status})

        except LaporanModel.DoesNotExist:
            return Response({'message': 'Laporan tidak ditemukan'}, status=404)
        except Exception as e:
            return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)
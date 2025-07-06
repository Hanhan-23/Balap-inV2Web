from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..appsgenerals.models import RekomendasiModel, LaporanModel
from bson import ObjectId

@api_view(['GET'])
def cardRekomendasi(request):
    if request.method == 'GET':
        search_query = request.GET.get('search', '')

        if search_query == 'lampu':
            search_query = 'lampu_jalan'

        rekomendasi = list(RekomendasiModel.objects())

        result = []
        for r in rekomendasi:
            laporan_id_pertama = r.id_laporan[0] if r.id_laporan else None
            laporan = None

            if laporan_id_pertama:
                laporan = LaporanModel.objects(id=laporan_id_pertama).first()

            if (
                search_query.lower() in r.status_urgent.lower()
                or (laporan and laporan.id_peta and search_query.lower() in laporan.id_peta.alamat.lower())
                or (laporan and search_query.lower() == laporan.jenis.lower()) 
            ):
                result.append({
                    'id': str(r.id),
                    'jumlah_laporan': r.jumlah_laporan,
                    'status_urgent': r.status_urgent,
                    'tingkat_urgent': r.tingkat_urgent,
                    'status_rekom': r.status_rekom,
                    'laporan': {
                        'judul': laporan.judul if laporan else None,
                        'jenis': laporan.jenis if laporan else None,
                        'alamat': laporan.id_peta.alamat if laporan and laporan.id_peta else None
                    }
                })

        return Response(result)
    
# @api_view(['GET'])
# def getDetailRekomendasi(request, id):
#     if request.method == 'GET':
#         try:
#             rekomendasi = RekomendasiModel.objects.get(id=ObjectId(id))

#             laporan_id_pertama = rekomendasi.id_laporan[0] if rekomendasi.id_laporan else None
#             laporan = None

#             if laporan_id_pertama:
#                 laporan = LaporanModel.objects(id=laporan_id_pertama).first()

#             result = {
#                 'id': str(rekomendasi.id),
#                 'jumlah_laporan': rekomendasi.jumlah_laporan,
#                 'status_urgent': rekomendasi.status_urgent,
#                 'tingkat_urgent': rekomendasi.tingkat_urgent,
#                 'status_rekom': rekomendasi.status_rekom,
#                 'tgl_rekom': rekomendasi.tgl_rekom,
#                 'laporan': {
#                     'id': str(laporan.id) if laporan else None,
#                     'judul': laporan.judul if laporan else None,
#                     'jenis': laporan.jenis if laporan else None,
#                     'deskripsi': laporan.deskripsi if laporan else None,
#                     'gambar': laporan.gambar if laporan else None,
#                     'persentase': laporan.persentase if laporan else None,
#                     'cuaca': laporan.cuaca if laporan else None,
#                     'status': laporan.status if laporan else None,
#                     'tgl_lapor': laporan.tgl_lapor if laporan else None,
#                     'cluster': laporan.cluster if laporan else None,
#                     'id_masyarakat': str(laporan.id_masyarakat) if laporan and laporan.id_masyarakat else None,
#                     'peta': {
#                         'alamat': laporan.id_peta.alamat if laporan and laporan.id_peta else None,
#                         'jalan': laporan.id_peta.jalan if laporan and laporan.id_peta else None,
#                         'latitude': laporan.id_peta.latitude if laporan and laporan.id_peta else None,
#                         'longitude': laporan.id_peta.longitude if laporan and laporan.id_peta else None,
#                     } if laporan else None
#                 }
#             }

#             return Response(result)

#         except RekomendasiModel.DoesNotExist:
#             return Response({'message': 'Rekomendasi tidak ditemukan'}, status=404)
#         except Exception as e:
#             return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)

@api_view(['GET'])
def getDetailRekomendasi(request, id):
    if request.method == 'GET':
        try:
            rekomendasi = RekomendasiModel.objects.get(id=ObjectId(id))

            semua_laporan = []

            for laporan_id in rekomendasi.id_laporan:
                laporan = LaporanModel.objects(id=laporan_id).first()
                if laporan:
                    semua_laporan.append({
                        'id': str(laporan.id),
                        'judul': laporan.judul,
                        'jenis': laporan.jenis,
                        'deskripsi': laporan.deskripsi,
                        'gambar': list(laporan.gambar) if isinstance(laporan.gambar, list)
                                  else [laporan.gambar] if laporan.gambar else [],
                        'persentase': laporan.persentase,
                        'cuaca': laporan.cuaca,
                        'status': laporan.status,
                        'tgl_lapor': laporan.tgl_lapor,
                        'cluster': laporan.cluster,
                        'id_masyarakat': str(laporan.id_masyarakat) if laporan.id_masyarakat else None,
                        'peta': {
                            'alamat': laporan.id_peta.alamat if laporan.id_peta else None,
                            'jalan': laporan.id_peta.jalan if laporan.id_peta else None,
                            'latitude': laporan.id_peta.latitude if laporan.id_peta else None,
                            'longitude': laporan.id_peta.longitude if laporan.id_peta else None,
                        } if laporan.id_peta else None
                    })

            result = {
                'id': str(rekomendasi.id),
                'jumlah_laporan': rekomendasi.jumlah_laporan,
                'status_urgent': rekomendasi.status_urgent,
                'tingkat_urgent': rekomendasi.tingkat_urgent,
                'status_rekom': rekomendasi.status_rekom,
                'tgl_rekom': rekomendasi.tgl_rekom,
                'laporan': semua_laporan  
            }

            return Response(result)

        except RekomendasiModel.DoesNotExist:
            return Response({'message': 'Rekomendasi tidak ditemukan'}, status=404)
        except Exception as e:
            return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)


@api_view(['PUT'])
def ubahStatusUrgentRekomendasi(request, id):
    if request.method == 'PUT':
        try:
            rekomendasi = RekomendasiModel.objects.get(id=ObjectId(id))

            new_status = request.data.get('status_rekom')

            allowed_statuses = ['belum_valid', 'valid', 'proses', 'selesai']
            if new_status not in allowed_statuses:
                return Response({'message': 'Status tidak valid. Pilihan: belum_valid, valid, proses, selesai.'}, status=400)

            RekomendasiModel.objects(id=ObjectId(id)).update(set__status_rekom=new_status)

            return Response({'message': 'Status urgent berhasil diubah', 'status_baru': new_status})

        except RekomendasiModel.DoesNotExist:
            return Response({'message': 'Rekomendasi tidak ditemukan'}, status=404)
        except Exception as e:
            return Response({'message': 'Terjadi kesalahan', 'error': str(e)}, status=400)
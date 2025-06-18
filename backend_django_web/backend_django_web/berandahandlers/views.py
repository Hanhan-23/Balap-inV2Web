from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..appsgenerals.models import RekomendasiModel, LaporanModel


@api_view(['GET'])
def empatAnalisis(request):
    if request.method == 'GET':
        rekomendasi = list(RekomendasiModel.objects(
            status_rekom__ne='selesai'))

        total_jumlah_laporan = sum([r.jumlah_laporan for r in rekomendasi])
        total_rekomendasi_terkini = len(rekomendasi)
        total_rekomendasi_tervalidasi = len(
            [r for r in rekomendasi if r.status_rekom == 'valid'])
        total_rekomendasi_butuh_validasi = len(
            [r for r in rekomendasi if r.status_rekom == 'belum_valid'])

        return Response({
            'jumlah_laporan_terkini': total_jumlah_laporan,
            'total_rekomendasi_terkini': total_rekomendasi_terkini,
            'total_rekomendasi_tervalidasi': total_rekomendasi_tervalidasi,
            'total_rekomendasi_butuh_validasi': total_rekomendasi_butuh_validasi,
        })


@api_view(['GET'])
def rekomendasiBeranda(request):
    if request.method == 'GET':
        rekomendasi = list(
            RekomendasiModel.objects(status_rekom__ne='selesai')
            .order_by('-tingkat_urgent')[:3]
        )

        id_laporan_pertama_list = [r.id_laporan[0]
                                   for r in rekomendasi if r.id_laporan]

        laporan_dict = {}
        if id_laporan_pertama_list:
            laporan_list = LaporanModel.objects(id__in=id_laporan_pertama_list)
            laporan_dict = {str(l.id): l for l in laporan_list}

        result = []
        for r in rekomendasi:
            id_laporan_pertama = str(r.id_laporan[0]) if r.id_laporan else None
            data_laporan = None

            if id_laporan_pertama and id_laporan_pertama in laporan_dict:
                laporan = laporan_dict[id_laporan_pertama]
                data_laporan = {
                    'id_laporan': str(laporan.id),
                    'judul': laporan.judul,
                    'gambar': laporan.gambar,
                    'alamat': laporan.id_peta.alamat if hasattr(laporan, 'id_peta') and laporan.id_peta else None
                }

            result.append({
                'id': str(r.id),
                'jumlah_laporan': r.jumlah_laporan,
                'status_urgent': r.status_urgent,
                'tingkat_urgent': r.tingkat_urgent,
                'laporan': data_laporan
            })

        return Response(result)
    
@api_view(['GET'])
def statistikLaporanBeranda(request):
    if request.method == 'GET':
        laporan_per_tanggal = LaporanModel.objects.aggregate(
            {
                '$group': {
                    '_id': {
                        'date': {'$dateToString': {'format': "%Y-%m-%d", 'date': "$tgl_lapor"}},
                        'jenis': '$jenis'
                    },
                    'jumlah': {'$sum': 1}
                }
            },
            {'$sort': {'_id.date': 1}}
        )

        hasil_dict = {}
        for item in laporan_per_tanggal:
            tanggal = item['_id']['date']
            jenis = item['_id']['jenis']
            jumlah = item['jumlah']

            if tanggal not in hasil_dict:
                hasil_dict[tanggal] = {'date': tanggal, 'jalan': 0, 'lampu': 0, 'jembatan': 0}

            if jenis == 'jalan':
                hasil_dict[tanggal]['jalan'] += jumlah
            elif jenis == 'lampu_jalan':
                hasil_dict[tanggal]['lampu'] += jumlah
            elif jenis == 'jembatan':
                hasil_dict[tanggal]['jembatan'] += jumlah

        hasil = list(hasil_dict.values())

        return Response(hasil)
    
@api_view(['GET'])
def petaRekomendasiBeranda(request):
    if request.method == 'GET':
        rekomendasi = list(RekomendasiModel.objects())

        result = []
        for r in rekomendasi:
            id_laporan_pertama = r.id_laporan[0] if r.id_laporan else None
            data_laporan = None

            if id_laporan_pertama:
                laporan = LaporanModel.objects(id=id_laporan_pertama).first()
                if laporan:
                    data_laporan = {
                        'id': str(laporan.id),
                        'judul': laporan.judul,
                        'latitude': laporan.id_peta.latitude if laporan.id_peta else None,
                        'longitude': laporan.id_peta.longitude if laporan.id_peta else None,
                    }

            result.append({
                'id': str(r.id),
                'status_urgent': r.status_urgent,
                'status_rekom': r.status_rekom,
                'laporan': data_laporan
            })

        return Response(result)
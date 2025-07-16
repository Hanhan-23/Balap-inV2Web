import pytest
from rest_framework.test import APIRequestFactory
from bson import ObjectId

from backend_django_web.rekomendasihandlers.views import (
    cardRekomendasi,
    getDetailRekomendasi,
    ubahStatusUrgentRekomendasi
)

DUMMY_ID = "68888beba7421d52bba80001"

@pytest.mark.parametrize(
    "search, expected_jenis, expected_alamat",
    [
        ("jalan", "jalan", "Jl. Raya"),
        ("lampu", "lampu_jalan", "Jl. Lampu Jalan"),
        ("jembatan", "jembatan", "Jl. Jembatan")
    ]
)
def test_cardRekomendasi_search_jenis(mocker, search, expected_jenis, expected_alamat):
    """
    Test cardRekomendasi untuk tiga jenis: jalan, lampu_jalan, jembatan.
    """
    mock_rekom = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.RekomendasiModel.objects'
    )
    mock_laporan = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.LaporanModel.objects'
    )

    class DummyPeta:
        def __init__(self, alamat):
            self.alamat = alamat

    class DummyLaporan:
        def __init__(self, jenis, alamat):
            self.id = ObjectId("63333beba7421d52bba12345")
            self.id_peta = DummyPeta(alamat)
            self.judul = f'Perbaikan {jenis.title()}'
            self.jenis = jenis

    class DummyRekom:
        def __init__(self, jenis):
            self.id = ObjectId(DUMMY_ID)
            self.id_laporan = [ObjectId("63333beba7421d52bba12345")]
            self.jumlah_laporan = 3
            self.status_urgent = 'sedang'
            self.tingkat_urgent = 'tinggi'
            self.status_rekom = 'belum_valid'

    # Dummy instance sesuai parameterized test
    mock_rekom.return_value = [DummyRekom(expected_jenis)]
    mock_laporan.return_value.first.return_value = DummyLaporan(expected_jenis, expected_alamat)

    factory = APIRequestFactory()
    request = factory.get(f'/api/card-rekomendasi/?search={search}')
    response = cardRekomendasi(request)

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['laporan']['alamat'] == expected_alamat
    assert response.data[0]['laporan']['jenis'] == expected_jenis

def test_getDetailRekomendasi_success(mocker):
    """
    Test getDetailRekomendasi mengembalikan data semua laporan terkait.
    """
    mock_objects = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.RekomendasiModel.objects'
    )
    mock_laporan = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.LaporanModel.objects'
    )

    class DummyPeta:
        def __init__(self):
            self.alamat = 'Jl. Veteran'
            self.jalan = 'Veteran'
            self.latitude = -6.12345
            self.longitude = 106.12345

    class DummyLaporan:
        def __init__(self):
            self.id = ObjectId("63333beba7421d52bba12345")
            self.id_peta = DummyPeta()
            self.judul = 'Perbaikan Jalan'
            self.jenis = 'jalan_berlubang'
            self.deskripsi = 'Berlubang parah'
            self.gambar = ['gambar1.png']
            self.persentase = 80
            self.cuaca = 'Hujan'
            self.status = 'belum_ditindak'
            self.tgl_lapor = '2025-07-13'
            self.cluster = 'Cluster A'
            self.id_masyarakat = ObjectId("61111beba7421d52bba98765")

    class DummyRekom:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.id_laporan = [ObjectId("63333beba7421d52bba12345")]
            self.jumlah_laporan = 1
            self.status_urgent = 'tinggi'
            self.tingkat_urgent = 'tinggi'
            self.status_rekom = 'valid'
            self.tgl_rekom = '2025-07-13'

    mock_objects.get.return_value = DummyRekom()
    mock_laporan.return_value.first.return_value = DummyLaporan()
    print("DEBUG patch test: mock_objects.get.return_value:", mock_objects.get.return_value)

    factory = APIRequestFactory()
    request = factory.get(f'/api/detail-rekomendasi/{DUMMY_ID}')
    response = getDetailRekomendasi(request, id=DUMMY_ID)

    assert response.status_code == 200
    assert response.data['laporan'][0]['judul'] == 'Perbaikan Jalan'
    assert response.data['laporan'][0]['peta']['alamat'] == 'Jl. Veteran'

def test_ubahStatusUrgentRekomendasi_success(mocker):
    """
    Test ubahStatusUrgentRekomendasi sukses ubah status_rekom.
    """
    mock_get = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.RekomendasiModel.objects.get'
    )
    mock_objs = mocker.patch(
        'backend_django_web.rekomendasihandlers.views.RekomendasiModel.objects'
    )

    class DummyRekom:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.status_rekom = 'valid'

    mock_get.return_value = DummyRekom()
    mock_objs.return_value.update.return_value = None

    factory = APIRequestFactory()
    data = {'status_rekom': 'proses'}
    request = factory.put(f'/api/ubah-status/{DUMMY_ID}', data, format='json')
    response = ubahStatusUrgentRekomendasi(request, id=DUMMY_ID)

    assert response.status_code == 200
    assert response.data['status_baru'] == 'proses'

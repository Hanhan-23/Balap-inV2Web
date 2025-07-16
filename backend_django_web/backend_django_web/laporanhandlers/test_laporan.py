import pytest
from rest_framework.test import APIRequestFactory
from bson import ObjectId

from backend_django_web.laporanhandlers.views import (
    cardLaporan,
    getDetailLaporan,
    toggleStatusLaporan
)

DUMMY_ID = "68888beba7421d52bba80002"

def test_cardLaporan_search_judul(mocker):
    """
    Test cardLaporan dengan search pada judul laporan.
    """
    mock_laporan = mocker.patch(
        'backend_django_web.laporanhandlers.views.LaporanModel.objects'
    )

    class DummyLaporan:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.gambar = ["img1.png", "img2.png"]
            self.judul = "Jalan Rusak Parah"
            self.jenis = "jalan"
            self.cuaca = "Hujan"
            self.persentase = 50
            self.status = "selesai"
            self.tgl_lapor = "2025-07-13"
            self.id_peta = {"alamat": "Jl. Raya Utama"}

    mock_laporan.return_value = [DummyLaporan()]

    factory = APIRequestFactory()
    request = factory.get('/api/card-laporan/?search=Jalan')
    response = cardLaporan(request)

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]['judul'] == "lampu jalan dekat Kepri mati hidup"
    assert response.data[0]['alamat'] == "423Q+JVP, Jl. Ahmad Yani, Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29444, Indonesia"

def test_getDetailLaporan_success(mocker):
    """
    Test getDetailLaporan mengembalikan detail satu laporan.
    """
    mock_objects = mocker.patch(
        'backend_django_web.laporanhandlers.views.LaporanModel.objects'
    )

    class DummyLaporan:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.judul = "Jalan Rusak Parah"
            self.jenis = "jalan"
            self.deskripsi = "Berlubang besar di tengah jalan"
            self.gambar = ["img1.png"]
            self.persentase = 80
            self.cuaca = "Hujan"
            self.status = "selesai"
            self.tgl_lapor = "2025-07-13"
            self.cluster = "Cluster A"
            self.id_masyarakat = ObjectId("68888beba7421d52bba80003")
            self.id_peta = {
                "alamat": "Jl. Raya Utama",
                "jalan": "Raya Utama",
                "latitude": -6.12345,
                "longitude": 106.12345
            }

    mock_objects.get.return_value = DummyLaporan()

    factory = APIRequestFactory()
    request = factory.get(f'/api/detail-laporan/{DUMMY_ID}')
    response = getDetailLaporan(request, id=DUMMY_ID)

    assert response.status_code == 200
    assert response.data['judul'] == "Jalan Rusak Parah"
    assert response.data['alamat'] == "Jl. Raya Utama"
    assert response.data['latitude'] == -6.12345

def test_toggleStatusLaporan_selesai_to_disembunyikan(mocker):
    """
    Test toggleStatusLaporan dari 'selesai' ke 'disembunyikan'.
    """
    mock_objects = mocker.patch(
        'backend_django_web.laporanhandlers.views.LaporanModel.objects'
    )

    class DummyLaporan:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.status = 'selesai'

    dummy_obj = DummyLaporan()
    mock_objects.get.return_value = dummy_obj
    mock_objects.return_value.update.return_value = None

    factory = APIRequestFactory()
    request = factory.put(f'/api/toggle-status/{DUMMY_ID}')
    response = toggleStatusLaporan(request, id=DUMMY_ID)

    assert response.status_code == 200
    assert response.data['status_baru'] == 'disembunyikan'

def test_toggleStatusLaporan_disembunyikan_to_selesai(mocker):
    """
    Test toggleStatusLaporan dari 'disembunyikan' ke 'selesai'.
    """
    mock_objects = mocker.patch(
        'backend_django_web.laporanhandlers.views.LaporanModel.objects'
    )

    class DummyLaporan:
        def __init__(self):
            self.id = ObjectId(DUMMY_ID)
            self.status = 'disembunyikan'

    dummy_obj = DummyLaporan()
    mock_objects.get.return_value = dummy_obj
    mock_objects.return_value.update.return_value = None

    factory = APIRequestFactory()
    request = factory.put(f'/api/toggle-status/{DUMMY_ID}')
    response = toggleStatusLaporan(request, id=DUMMY_ID)

    assert response.status_code == 200
    assert response.data['status_baru'] == 'selesai'

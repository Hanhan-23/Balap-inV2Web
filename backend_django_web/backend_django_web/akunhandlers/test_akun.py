import pytest
from rest_framework.test import APIRequestFactory
from bson import ObjectId

from backend_django_web.akunhandlers.views import (
    cardAkunPemerintah,
    toggleStatusPemerintah,
    updateAkunPemerintah
)

test_id = "68724beba7421d52bba84577"

def test_cardAkunPemerintah_no_search(mocker):
    class DummyPemerintah:
        def __init__(self):
            self.id = ObjectId(test_id)
            self.nama_lengkap = 'Budi'
            self.email = 'budi@mail.com'
            self.no_pegawai = '123'
            self.no_telp = '080000000'
            self.tgl_pemerintah = '2025-07-12'
            self.status = 'verif'

    mock_pemerintah = mocker.patch(
        'backend_django_web.akunhandlers.views.Pemerintah.objects'
    )
    mock_pemerintah.return_value = [DummyPemerintah()]

    factory = APIRequestFactory()
    request = factory.get('/api/card-akun-pemerintah/')
    response = cardAkunPemerintah(request)

    print("RESP (cardAkunPemerintah):", response.data)

    assert response.status_code == 200
    assert response.data[0]['id'] == str(ObjectId(test_id))
    assert response.data[0]['nama_lengkap'] == 'Budi'

def test_toggleStatusPemerintah_verif_to_belum_verif(mocker):
    class DummyPemerintah:
        def __init__(self):
            self.id = ObjectId(test_id)
            self.status = 'verif'
    dummy_obj = DummyPemerintah()

    mock_objects = mocker.patch(
        'backend_django_web.akunhandlers.views.Pemerintah.objects'
    )
    mock_objects.get.return_value = dummy_obj
    mock_objects.return_value.update.return_value = None

    factory = APIRequestFactory()
    request = factory.put(f'/api/toggle-status/{test_id}')
    response = toggleStatusPemerintah(request, id=test_id)

    print("RESP (toggleStatusPemerintah):", response.data)

    assert response.status_code == 200
    assert response.data['status_baru'] == 'belum_verif'

def test_updateAkunPemerintah_success(mocker):
    class DummyPemerintah:
        def __init__(self):
            self.id = ObjectId(test_id)
            self.password = 'hashedpassword'

    dummy_obj = DummyPemerintah()

    mock_get = mocker.patch(
        'backend_django_web.akunhandlers.views.Pemerintah.objects.get'
    )
    mock_get.return_value = dummy_obj

    mock_objs = mocker.patch(
        'backend_django_web.akunhandlers.views.Pemerintah.objects'
    )
    mock_objs.return_value.update.return_value = None

    factory = APIRequestFactory()
    data = {'nama_lengkap': 'Baru', 'email': 'baru@mail.com'}
    request = factory.put(f'/api/update-akun/{test_id}', data, format='json')
    response = updateAkunPemerintah(request, id=test_id)

    print("RESP (updateAkunPemerintah):", response.data)

    assert response.status_code == 200
    assert 'Akun berhasil diupdate' in response.data['message']

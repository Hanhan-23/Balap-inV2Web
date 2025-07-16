from locust import HttpUser, task, between

class MasyarakatUser(HttpUser):
    wait_time = between(1, 3)
    host = "https://balapin-fnez.shuttle.app"
    token = "b91ebfab-31d7-48a4-a16c-4f1943fe89d8"

    @task
    def buat_laporan(self):
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }

        data_laporan = {
            "gambar": "https://balapin.s3.amazonaws.com/2c6e0ade-6b3a-4f29-8315-225fe043a3c8.jpg",
            "judul": "Lubang besar di jalan utama",
            "jenis": "jalan",
            "deskripsi": "Terdapat lubang besar di dekat lampu merah simpang Baloi",
            "cuaca": "cerah",
            "persentase": 0.8,
            "status": "selesai",
            "id_masyarakat": "687249361e0b1ae462c82d93",
            "id_peta": {
                "alamat": "Jl. S. Parman, Mangsang, Kec. Sei Beduk, Kota Batam, Kepulauan Riau 29433",
                "jalan": "Jl. S. Parman, Mangsang",
                "latitude": 104.043678,
                "longitude": 1.050921
            }
        }

        with self.client.post(
            "/laporan/uploadlaporan",
            headers=headers,
            json=data_laporan,
            catch_response=True
        ) as response:
            if response.status_code in [200, 201]:
                response.success()
                print("Laporan berhasil dikirim")
            else:
                response.failure(f"Gagal kirim laporan. Status: {response.status_code} - {response.text}")

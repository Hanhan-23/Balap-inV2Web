from locust import HttpUser, task, between
import json
class UploadLaporanUser(HttpUser):
    wait_time = between(1, 5)
    host = "https://balapin-fnez.shuttle.app"

    @task
    def upload_laporan(self):
        # JSON dari laporan
        laporan_data = {
                "judul": "test locust aja BODOH",
                "jenis": "jalan",
                "deskripsi": "Terdapat lubang besar di dekat lampu merah simpang Baloi",
                "cuaca": "cerah",
                "persentase": 0.6,
                "status": "selesai",
                "id_masyarakat": "68050a842916f14bdf68b6c5",
                "id_peta": {
                "alamat": "Jl. S. Parman, Mangsang, Kec. Sei Beduk, Kota Batam, Kepulauan Riau 29433",
                "jalan": "Jl. S. Parman, Mangsang",
                "latitude": 1.041475,
                "longitude": 103.983714
            }
        }

        # Buka file gambar
        with open("dummy.jpg", "rb") as image_file:
            # Kirim file multipart form
            files = {
                "gambar": ("dummy.jpg", image_file, "image/jpeg"),
            }
            data = {
                "laporan": json.dumps(laporan_data)
            }

            # Kirim POST multipart form
            response = self.client.post("/laporan/uploadlaporan", files=files, data=data)

            print(f"Status Code: {response.status_code}")
            try:
                print(response.json())
            except Exception:
                print(response.text)

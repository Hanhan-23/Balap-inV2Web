from locust import HttpUser, task, between
import json

class BalapinUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://127.0.0.1:8000"
    token = None

    def on_start(self):
        """Login dan ambil token saat user pertama kali dijalankan"""
        self.login()

    def login(self):
        data = {
            "email": "dbmsa@gmail.com",
            "password": "rahasia123"
        }
        with self.client.post("/auth/login", data=data, catch_response=True) as response:
            print("Login status:", response.status_code)
            if response.status_code == 200:
                try:
                    result = response.json()
                    self.token = result.get("access")
                    if self.token:
                        print("Login berhasil, token didapat.")
                        response.success()
                    else:
                        print("Login berhasil tapi token tidak ditemukan.")
                        response.failure("Token tidak ditemukan")
                except Exception as e:
                    print("Gagal parsing JSON:", e)
                    response.failure("Format respons login salah")
            else:
                response.failure("Login gagal")

    @task
    def tampilkan_rekomendasi(self):
        if not self.token:
            print("Tidak ada token, melewati task tampilkan_rekomendasi")
            return

        headers = {
            "Authorization": f"Bearer {self.token}"
        }

        with self.client.get("/rekomendasi", headers=headers, catch_response=True) as response:
            if response.status_code == 200:
                print("Rekomendasi berhasil diambil")
                response.success()
            else:
                print(f"Gagal ambil rekomendasi: {response.status_code}")
                response.failure("Gagal tampilkan rekomendasi")

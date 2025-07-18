from locust import HttpUser, task, between

class BalapinDetailRekomendasiUser(HttpUser):
    wait_time = between(1, 3)
    host = "https://pemerintah.balapin.web.id"

    @task
    def detail_rekomendasi(self):
        rekomendasi_id = "687a5811570ea8376f3c9602"
        endpoint = f"/data-rekomendasi/{rekomendasi_id}"

        with self.client.get(endpoint, catch_response=True) as response:
            print(f"Status GET {endpoint}:", response.status_code)
            if response.status_code == 200:
                response.success()
            else:
                response.failure("Gagal mengambil detail rekomendasi")

from locust import HttpUser, task, between

class BalapinUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://127.0.0.1:8000"

    @task
    def login(self):
        data = {
            "email": "dbmsa@gmail.com",
            "password": "rahasia123"
        }
        with self.client.post("/auth/login", data=data, catch_response=True) as response:
            print("Login status:", response.status_code)
            if response.status_code == 200:
                response.success()
            else:
                response.failure("Login gagal")
# jalankan dengan locust -f LoginLocust.py
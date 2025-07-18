from locust import HttpUser, task, between

class BalapinUser(HttpUser):
    wait_time = between(1, 3)
    host = "https://pemerintah.balapin.web.id"

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

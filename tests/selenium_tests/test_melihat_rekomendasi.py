# test_melihat_rekomendasi.py

import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture(scope="module")
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.implicitly_wait(5)
    yield driver
    driver.quit()

def test_melihat_daftar_rekomendasi(driver):
    # Use Case 3: Pengujian Menampilkan daftar rekomendasi

    driver.get("http://localhost:3000/")

    email = "dbmsa@gmail.com"
    password = "rahasia123"

    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

    try:
        driver.find_element(By.CSS_SELECTOR, '.text-green-600')
        print("Login berhasil!")
    except:
        print("Login gagal atau tidak ditemukan pesan sukses.")

    menu_rekomendasi = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Data Rekomendasi"))
    )
    menu_rekomendasi.click()

    try:
        WebDriverWait(driver, 10).until(EC.url_contains("/data-rekomendasi"))
        print("URL berubah ke halaman Daftar Rekomendasi:", driver.current_url)
    except:
        pytest.fail(f"Timeout: URL tidak berubah ke '/data-rekomendasi'. URL sekarang: {driver.current_url}")

    try:
        table = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "table tbody tr"))
        )
        rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
        print(f"Berhasil melihat daftar rekomendasi, ditemukan {len(rows)} baris")
        assert len(rows) > 0, "Tabel rekomendasi kosong"
    except Exception as e:
        pytest.fail("Gagal menemukan tabel rekomendasi di halaman.")

    print("Test Menampilkan Daftar Rekomendasi sukses")
    time.sleep(1)  # optional pause for observation

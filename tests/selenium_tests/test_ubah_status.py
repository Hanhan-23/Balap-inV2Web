# Use Case 2: Pengujian Validasi dan Tindak Lanjut Laporan oleh Admin Pemerintah

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

def test_ubah_status(driver):
    # 1) Login
    driver.get("http://localhost:3000/")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "email")))
    driver.find_element(By.ID, "email").send_keys("dbmsa@gmail.com")
    driver.find_element(By.ID, "password").send_keys("rahasia123")
    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

    # 2) Masuk ke halaman Data Rekomendasi
    WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Data Rekomendasi"))
    ).click()
    time.sleep(2)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'table tbody tr'))
    )
    print("✅ Tabel data rekomendasi ditemukan")

    # Fungsi verifikasi status (tetap sama)
    def verify_status_change(expected_status):
        time.sleep(1)
        row = driver.find_elements(By.CSS_SELECTOR, 'table tbody tr')[0]
        status = row.find_elements(By.TAG_NAME, 'td')[5].text.strip().lower()
        assert expected_status in status, f"❌ Status salah: {status}, seharusnya: {expected_status}"
        print(f"✅ Status berhasil diubah menjadi '{expected_status}'")

    # Fungsi membuka dropdown + submenu Ubah Status (tetap sama)
    def open_status_menu():
        row = driver.find_elements(By.CSS_SELECTOR, 'table tbody tr')[0]
        dropdown_td = row.find_elements(By.TAG_NAME, 'td')[-1]
        action_btn = dropdown_td.find_element(By.CSS_SELECTOR, "button[data-slot='dropdown-menu-trigger']")
        driver.execute_script("arguments[0].scrollIntoView(true);", action_btn)
        WebDriverWait(driver, 5).until(EC.element_to_be_clickable(action_btn))
        action_btn.click()
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div[role='menu'][data-state='open']"))
        )
        WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((
                By.XPATH,
                "//div[@role='menuitem' and normalize-space(text())='Ubah Status']"
            ))
        ).click()

    # 3) Loop through statuses
    for status in ("valid", "proses"):
        open_status_menu()
        opt = WebDriverWait(driver, 5).until(
            EC.element_to_be_clickable((
                By.XPATH,
                f"//div[@role='menuitem' and normalize-space(text())='{status}']"
            ))
        )
        opt.click()
        verify_status_change(status)

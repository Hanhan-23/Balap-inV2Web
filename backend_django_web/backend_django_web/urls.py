"""
URL configuration for backend_django_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backend_django_web.laporanhandlers import views as viewslaporan
from backend_django_web.authhandlers import views as viewsauth
from backend_django_web.berandahandlers import views as viewsberanda
from backend_django_web.akunhandlers import views as viewsakun
from backend_django_web.rekomendasihandlers import views as viewsrekomendasi

urlpatterns = [
    path('admin/', admin.site.urls),

    #Auth Handler
    path('auth/buat', viewsauth.pemerintahBuatAkun, name='pemerintahbuatakun'),
    path('auth/login', viewsauth.pemerintahLoginAkun, name='pemerintahloginakun'),
    path('auth/refresh', viewsauth.refresh_token_view, name='pemerintahrefreshakun'),
    path('auth/me', viewsauth.pemerintahMe, name='pemerintahMe'),

    #Beranda Handler
    path('beranda/empatanalisis', viewsberanda.empatAnalisis, name='berandaempatanalisis'),
    path('beranda/rekomendasiberanda', viewsberanda.rekomendasiBeranda, name='rekomendasiberanda'),
    path('beranda/statistikberanda', viewsberanda.statistikLaporanBeranda, name='statistiklaporanberanda'),
    path('beranda/petaberanda', viewsberanda.petaRekomendasiBeranda, name='petarekomendasiberanda'),

    #Laporan Handler
    path('laporan', viewslaporan.cardLaporan, name='laporan'),
    path('laporan/detail/<str:id>', viewslaporan.getDetailLaporan, name='laporandetail'),
    path('laporan/toggle-status/<str:id>', viewslaporan.toggleStatusLaporan, name='togglestatus'),

    #Akun Handler
    path('akun', viewsakun.cardAkunPemerintah, name='akun'),
    path('akun/toggle-status/<str:id>', viewsakun.toggleStatusPemerintah, name='togglestatusakun'),
    path('akun/update/<str:id>', viewsakun.updateAkunPemerintah, name='updateakun'),
    path('akun/detail/<str:id>', viewsauth.getAkunPemerintah, name='getakun'),

    #Akun Rekomendasi
    path('rekomendasi', viewsrekomendasi.cardRekomendasi, name='rekomendasi'),
    path('rekomendasi/<str:id>', viewsrekomendasi.getDetailRekomendasi, name='detailrekomendasi'),
    path('rekomendasi/update/<str:id>', viewsrekomendasi.ubahStatusUrgentRekomendasi, name='ubahstatusrekomendasi'),
]

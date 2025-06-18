from django.apps import AppConfig

class LaporanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend_django_web'

    def ready(self):
        from .mongoconnection import init_mongo_connection
        init_mongo_connection()

from mongoengine import connect, get_connection
from pymongo.errors import ConnectionFailure
from decouple import config

def init_mongo_connection():
    try:
        connect(
            db='balap_in',
            host=config('MONGO_HOST'),
            tls=True,
            tlsAllowInvalidCertificates=True
        )

        conn = get_connection()
        conn.admin.command('ping')
        print("Koneksi ke MongoDB berhasil!")

    except ConnectionFailure as e:
        print(f"Gagal koneksi ke MongoDB: {e}")

from mongoengine import connect, get_connection
from pymongo.errors import ConnectionFailure

def init_mongo_connection():
    try:
        connect(
            db='balap_in',
            host='mongodb+srv://pbl20egovv:34HgRM15dPKCyuDM@balapin.q11l4z0.mongodb.net/?retryWrites=true&w=majority&appName=balapin',
            tls=True,
            tlsAllowInvalidCertificates=True
        )

        conn = get_connection()
        conn.admin.command('ping')
        print("Koneksi ke MongoDB berhasil!")

    except ConnectionFailure as e:
        print(f"Gagal koneksi ke MongoDB: {e}")

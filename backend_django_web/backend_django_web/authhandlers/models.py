from mongoengine import Document, StringField, DateTimeField, ObjectIdField, IntField
from datetime import datetime

class Pemerintah(Document):
    alamat = StringField()
    nama_lengkap = StringField()
    email = StringField()
    no_pegawai = IntField()
    no_telp = StringField()
    password = StringField()
    status = StringField(choices=['belum_verif', 'verif'])
    tgl_pemerintah = DateTimeField(default=datetime.now)

    meta = {'collection': 'pemerintah'}
from mongoengine import Document, StringField, DateTimeField, IntField, FloatField, ListField, EmbeddedDocument, EmbeddedDocumentField

class RekomendasiModel(Document):
    jumlah_laporan = IntField()
    status_urgent = StringField()
    tingkat_urgent = FloatField()
    status_rekom = StringField()
    tgl_rekom = DateTimeField()
    id_laporan = ListField()
    
    meta = {'collection': 'rekomendasi'}

class PetaModel(EmbeddedDocument):
    _id = StringField()
    alamat = StringField()
    jalan = StringField()
    latitude = FloatField()
    longitude = FloatField()

class LaporanModel(Document):
    gambar = StringField()
    jenis = StringField()
    judul = StringField()
    deskripsi = StringField()
    persentase = FloatField()
    cuaca = StringField()
    status = StringField()
    tgl_lapor = DateTimeField()
    cluster = IntField()
    id_masyarakat = StringField()
    id_peta = EmbeddedDocumentField(PetaModel)

    meta = {'collection': 'laporan'}
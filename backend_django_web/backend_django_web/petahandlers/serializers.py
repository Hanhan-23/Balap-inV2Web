from rest_framework import serializers

class DetailLaporanPetaSerializers(serializers.Serializer):
    id_peta = serializers.IntegerField()
    alamat = serializers.CharField()
    jalan = serializers.CharField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    id_laporan = serializers.CharField()
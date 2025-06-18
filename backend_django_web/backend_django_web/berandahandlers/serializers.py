from rest_framework import serializers
from ..appsgenerals.models import RekomendasiModel

class EmpatAnalisisSerializer(serializers.Serializer):
    id = serializers.CharField()  
    jumlah_laporan = serializers.IntegerField()
    status_urgent = serializers.CharField()
    tingkat_urgent = serializers.FloatField()
    status_rekom = serializers.ChoiceField(choices=['belum_valid', 'valid', 'proses', 'selesai'])
    tgl_rekom = serializers.DateTimeField()
    id_laporan = serializers.ListField(child=serializers.CharField())
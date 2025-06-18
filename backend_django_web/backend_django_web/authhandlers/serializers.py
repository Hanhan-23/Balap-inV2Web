from rest_framework import serializers
from .models import Pemerintah

class PemerintahSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)  
    alamat = serializers.CharField(required=False, allow_blank=True)
    nama_lengkap = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    no_pegawai = serializers.IntegerField(required=True)
    no_telp = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(required=True)
    status = serializers.ChoiceField(choices=['belum_verif', 'verif'], required=False)
    tgl_pemerintah = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        pemerintah = Pemerintah(**validated_data)
        pemerintah.save()
        return pemerintah

    def update(self, instance, validated_data):
        instance.alamat = validated_data.get('alamat', instance.alamat)
        instance.nama_lengkap = validated_data.get('nama_lengkap', instance.nama_lengkap)
        instance.email = validated_data.get('email', instance.email)
        instance.no_pegawai = validated_data.get('no_pegawai', instance.no_pegawai)
        instance.no_telp = validated_data.get('no_telp', instance.no_telp)
        instance.password = validated_data.get('password', instance.password)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

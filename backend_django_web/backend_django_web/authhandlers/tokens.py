from rest_framework_simplejwt.tokens import RefreshToken

class CustomToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)

        token['email'] = user.email
        token['nama_lengkap'] = user.nama_lengkap
        token['status'] = user.status

        return token
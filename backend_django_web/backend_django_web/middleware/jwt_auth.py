import jwt
from django.conf import settings
from django.http import JsonResponse
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        excluded_paths = ['/auth/login', '/auth/refresh', '/auth/buat']
        if request.path in excluded_paths:
            return self.get_response(request)

        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user_id = payload['user_id']
            except ExpiredSignatureError:
                return JsonResponse({'error': 'Token expired'}, status=401)
            except (InvalidTokenError, ValueError):
                return JsonResponse({'error': 'Invalid token by middleware'}, status=401)

        return self.get_response(request)

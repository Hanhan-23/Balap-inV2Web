from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..authhandlers.auth_utils import jwt_required


@api_view(['GET'])
@jwt_required
def hello(request):
    if request.method == 'GET':
        return Response('hello')
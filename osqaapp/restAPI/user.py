from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from osqaapp.serializers import *
from django.contrib.auth.models import *
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model # If used custom user model


from django.contrib.auth import get_user_model

from rest_framework import status, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
@api_view(['POST', 'GET'])
def users(request):
    if request.method == 'GET':
        snippets = User.objects.all()
        serializer = UserSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()




from rest_auth.registration.views import RegisterView
...
class RegisterViewToken(RegisterView):
    authentication_classes = ()
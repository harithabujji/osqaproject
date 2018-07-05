
from osqaapp.serializers import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated




@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def tag_list(request):
    if request.method == 'GET':
        snippets = Tag.objects.values('name').distinct()
        serializer = TagModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)



@csrf_exempt
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def tag_detail(request,t_name):

    if request.method == 'GET':
        snippet = Tag.objects.filter(name=t_name)
        serializer = TagDetailsSerializer(snippet,many=True)
        return JsonResponse(serializer.data, safe=False)






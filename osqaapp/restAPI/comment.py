


from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from osqaapp.serializers import *




from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated


@csrf_exempt
@api_view(['GET','PUT','DELETE'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def comment_detail(request, pk,c_id):
    try:
        cmnt =  Comment.objects.get(question_id=pk,id=c_id)
    except Comment.DoesNotExist:
        return HttpResponse(status=404)


    if request.method == 'GET':
        serializer = CommentQuestionModelSerializer(cmnt)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = CommentQuestionModelSerializer(cmnt, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        cmnt.delete()
        return HttpResponse(status=204)


























from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

from osqaapp.serializers import *


@csrf_exempt
@api_view(['GET', 'POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def commentquestion(requestContext, pk):
    if requestContext.method == 'GET':
        snippets = Comment.objects.filter(question_id=pk)
        serializer = CommentQuestionModelSerializer(snippets,many=True)
        return JsonResponse(serializer.data, safe=False)

    if requestContext.method == 'POST':
        print("yes")
        serializer = CommentQuestionModelSerializer(data=requestContext.data)
        import ipdb
        ipdb.set_trace()
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = requestContext.user
            serializer.validated_data['user_id'] = requestContext.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

from rest_framework.views import APIView
class commentquestionview(APIView):
    def get(self, request, pk, format=None):
        snippets = Comment.objects.filter(question_id=pk)
        serializer = CommentQuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request, pk, format=None):
        serializer = CommentQuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



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


























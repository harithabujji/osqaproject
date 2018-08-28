
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from osqaapp.serializers import *

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated



@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def answerquestion(request, pk):
    if request.method == 'GET':
        snippets = Answer.objects.filter(question_id=pk)
        serializer = AnswerQuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer = AnswerQuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def commentquestions(request, pk):
    if request.method == 'GET':
        snippets = Comment.objects.filter(question_id=pk)
        serializer = CommentQuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        serializer =  CommentQuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
@api_view(['GET','PUT','DELETE'])
# @authentication_classes((SessionAuthentication, BasicAuthentication))
# @permission_classes((IsAuthenticated,))
def answer_detail(request, pk,a_id):
    try:
        ans = Answer.objects.get(question_id=pk,id=a_id)
    except Answer.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = AnswerQuestionModelSerializer(ans)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = AnswerQuestionModelSerializer(ans, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ans.delete()
        return HttpResponse(status=204)



@csrf_exempt
@api_view(['GET','PUT','DELETE'])
# @authentication_classes((SessionAuthentication, BasicAuthentication))
# @permission_classes((IsAuthenticated,))
def answer_question(request, pk):
    if request.method == 'GET':
        snippets = Answer.objects.all().values('text').filter(question_id=pk)
        serializer = AnswerQuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    try:
        ans = Answer.objects.all().values('text').filter(question_id=pk)
    except Answer.DoesNotExist:
        return HttpResponse(status=404)



    if request.method == 'PUT':
        serializer = AnswerQuestionModelSerializer(ans, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ans.delete()
        return HttpResponse(status=204)



@csrf_exempt
@api_view(['GET','PUT','DELETE'])

def comment_question(request, pk):
    if request.method == 'GET':
        snippets = Comment.objects.all().values('text').filter(question_id=pk)
        serializer = CommentQuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    try:
        ans = Comment.objects.all().values('text').filter(question_id=pk)
    except Comment.DoesNotExist:
        return HttpResponse(status=404)



    if request.method == 'PUT':
        serializer =CommentQuestionModelSerializer(ans, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        ans.delete()
        return HttpResponse(status=204)

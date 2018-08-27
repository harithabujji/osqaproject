from osqaapp.serializers import *

from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



@csrf_exempt
@api_view(['POST', 'GET'])
@permission_classes((IsAuthenticated,))
def question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all()
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        serializer = QuestionModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def questionss_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all()
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET'])

@authentication_classes([])
@permission_classes([])
def recent_question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all().order_by("-time")
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)





@csrf_exempt
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def vote_question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all().order_by("-votecount")
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)




@authentication_classes([])
@permission_classes([])
def view_question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all().order_by("-viewcount")
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)




@authentication_classes([])
@permission_classes([])
def answer_question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.all().order_by("-answercount")
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)


@authentication_classes([])
@permission_classes([])
def unanswer_question_list(request):
    if request.method == 'GET':
        snippets = Question.objects.filter(answercount=0)
        serializer = QuestionModelSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
@api_view(['GET','PUT','DELETE'])
@authentication_classes([])
@permission_classes([])
def question_detail(request, pk):
    try:
        snippet = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = QuestionModelSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionModelSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)



# # @authentication_classes((SessionAuthentication, BasicAuthentication))
# # @permission_classes((IsAuthenticated,))
# class TagsofQuestionView(APIView):
#
#     def get(self, request, pk, format=None):
#         snippet = Tag.objects.filter(Question_id = pk)
#         serializer = TagSerializer(snippet,many=True)
#         return JsonResponse(serializer.data,safe=False)
#
#     def post(self,request, pk, format=None):
#         data = JSONParser().parse(request)
#         serializer = TagSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
#
#

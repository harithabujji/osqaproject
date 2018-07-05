from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from osqaapp.serializers import *



@csrf_exempt
@api_view(['GET', 'POST'])
def votesonquestion(request, pk):

    if request.method == 'GET':
        snippets = VotesCount.objects.get(postquestion_id=pk)
        serializer = VotesCountModelSerializer(snippets)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        t = Vote.objects.values('question_id').filter(question_id=pk, user=request.user)
        if t:
            return JsonResponse(data={}, status=201)
        serializer = VotesModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)










# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.permissions import IsAuthenticated
#
# from osqaapp.serialize import *
#
# @csrf_exempt
# @api_view(['POST','GET'])
# # @authentication_classes((SessionAuthentication, BasicAuthentication))
# # @permission_classes((IsAuthenticated,))
# def vote_list(request):
#     if request.method == 'GET':
#         vte_list = Vote.objects.all()
#         serializer = VoteSerializer(vte_list, many=True)
#         return JsonResponse(serializer.data, safe=False)
#
#     elif request.method == 'POST':
#         serializer = VoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)
#
#
# @csrf_exempt
# @api_view(['GET','PUT','DELETE'])
# # @authentication_classes((SessionAuthentication, BasicAuthentication))
# # @permission_classes((IsAuthenticated,))
# def vote_detail(request, pk):
#     try:
#         vte = Vote.objects.get(pk=pk)
#     except Vote.DoesNotExist:
#         return HttpResponse(status=404)
#
#     if request.method == 'GET':
#         serializer = VoteSerializer(vte)
#         return JsonResponse(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = VoteSerializer(vte, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
#
#     elif request.method == 'DELETE':
#         vte.delete()
#         return HttpResponse(status=204)

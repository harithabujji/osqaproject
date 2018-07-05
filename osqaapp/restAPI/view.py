from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from osqaapp.serializers import *


@csrf_exempt
@api_view(['GET', 'POST'])
def viewsonquestion(request, pk):
    if request.method == 'GET':
        snippets = ViewsCount.objects.get(postquestion_id=pk)
        serializer = ViewsCountModelSerializer(snippets)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        t = View.objects.values('question_id').filter(question_id=pk, user=request.user)
        if t:
            return JsonResponse(data={},status=201)
        serializer = ViewsModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['question_id'] = pk
            serializer.validated_data['user'] = request.user
            serializer.validated_data['user_id'] = request.user.id
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



#
# @csrf_exempt
# @api_view(['POST','GET'])
# # @authentication_classes((SessionAuthentication, BasicAuthentication))
# # @permission_classes((IsAuthenticated,))
# def view_list(request):
#     if request.method == 'GET':
#         viw_list = View.objects.all()
#         serializer = ViewSerializer(viw_list, many=True)
#         return JsonResponse(serializer.data, safe=False)
#
#     elif request.method == 'POST':
#         serializer = ViewSerializer(data=request.data)
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
# def view_detail(request, pk):
#     try:
#         viw = View.objects.get(pk=pk)
#     except View.DoesNotExist:
#         return HttpResponse(status=404)
#
#     if request.method == 'GET':
#         serializer = ViewSerializer(viw)
#         return JsonResponse(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = ViewSerializer(viw, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)
#
#     elif request.method == 'DELETE':
#         viw.delete()
#         return HttpResponse(status=204)

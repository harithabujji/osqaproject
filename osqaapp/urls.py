from osqaapp.views import *
from django.urls import path
from . import views
from osqaapp.restAPI import *
from django.views.generic import TemplateView
from django.urls import path,include
from django.conf.urls import include, url
app_name="osqaapp"

urlpatterns=[
        path('api/v2/question/', questionss_list),
        path('api/v2/que/', csrf_exempt(question_list)),
        path('newque/', recent_question_list),
        path('viewque/', view_question_list),
        path('voteque/', vote_question_list),
        path('answerque/', answer_question_list),
        path('unanswerque/', unanswer_question_list),

        path('que_detail/<int:pk>/', question_detail),

        url('comments/<int:pk>/', commentquestion),
        path('commentsview/<int:pk>/', csrf_exempt(commentquestionview.as_view()),name='cmnts'),
        path('comment_detail/<int:pk>/<int:c_id>/',comment_detail),

        path('answers/<int:pk>/',answerquestion),
        path('ans_detail/<int:pk>/<int:a_id>/', answer_detail),

        path('views/<int:pk>/',viewsonquestion),
        path('votes/<int:pk>/',votesonquestion),


        path('tag/', tag_list),
        path('tag_detail/<str:t_name>/', tag_detail),

        path('users/', users),

        path('templateview/', TemplateView.as_view(template_name="index.html")),


]
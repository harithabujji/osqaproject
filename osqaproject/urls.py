"""osqaproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token
from osqaapp import views
from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView
from osqaapp.restAPI import *

urlpatterns = [

    path('admin/', admin.site.urls),
    path('osqaapp/',include('osqaapp.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    url('rest-auth/registration/', csrf_exempt(RegisterViewToken.as_view()), name='rest_register'),

    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),

    url(r'^api-jwttoken-auth/', obtain_jwt_token),
    url(r'^api-basictoken-auth/', obtain_auth_token),

    url(r'^', TemplateView.as_view(template_name="index.html")),



]

from rest_framework import serializers
from osqaapp.models import *


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class TagDetailsSerializer(serializers.ModelSerializer):

    question=QuestionSerializer(required=True)
    class Meta:
        model=Tag
        fields=['question']


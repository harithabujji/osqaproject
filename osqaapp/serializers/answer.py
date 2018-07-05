from rest_framework import serializers
from osqaapp.models import *


class AnswerQuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question_id', 'user_id', 'text']

    def create(self, validated_data):
        user = User.objects.all().values('username').filter(pk=validated_data['user_id'])
        album = Answer.objects.create(**validated_data, username=user[0]['username'])
        q = Question.objects.get(pk=validated_data['question_id'])
        q.answercount = q.answercount + 1
        q.save()
        return album

    def update(self, instance, validated_data):
        instance.text= validated_data.get('text', instance.text)
        instance.save()
        return instance



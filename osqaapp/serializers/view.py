from rest_framework import serializers
from osqaapp.models import *


class ViewsModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = View
        fields = ['question_id', 'user_id']

    def create(self, validated_data):
        user = User.objects.all().values('username').filter(pk=validated_data['user_id'])
        album = View.objects.create(**validated_data, username=user[0]['username'])
        t = ViewsCount.objects.get(postquestion_id=validated_data['question_id'])
        t.count = t.count + 1
        t.save()
        q = Question.objects.get(pk=validated_data['question_id'])
        q.viewcount = q.viewcount + 1
        q.save()
        return album




class ViewsCountModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = ViewsCount
        fields = ['postquestion_id', 'count']


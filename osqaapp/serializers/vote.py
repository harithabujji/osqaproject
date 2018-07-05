from rest_framework import serializers
from osqaapp.models import *


class VotesModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['question_id', 'user_id']

    def create(self, validated_data):
        user = User.objects.all().values('username').filter(pk=validated_data['user_id'])
        album = Vote.objects.create(**validated_data, username=user[0]['username'])
        t = VotesCount.objects.get(postquestion_id=validated_data['question_id'])
        t.count = t.count+1
        t.save()
        q = Question.objects.get(pk=validated_data['question_id'])
        q.votecount = q.votecount + 1
        q.save()
        return album








class VotesCountModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VotesCount
        fields = ['postquestion_id','count']



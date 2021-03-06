from rest_framework import serializers
from osqaapp.models import *
from django.utils import timezone
import pytz
from datetime import datetime


class TagModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ['name']


class QuestionModelSerializer(serializers.ModelSerializer):
    time=serializers.DateTimeField(required=False)
    viewcount = serializers.IntegerField(required=False)
    votecount = serializers.IntegerField(required=False)
    answercount = serializers.IntegerField(required=False)
    username = serializers.CharField(max_length=1024, required=False)

    class Meta:
        model = Question
        fields = ['id', 'title', 'description', 'tags', 'time', 'user_id', 'viewcount', 'votecount', 'username',
                  'answercount']

    def create(self, validated_data):
        user= User.objects.all().values('username').filter(pk=validated_data['user_id'])
        album = Question.objects.create(**validated_data,time=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),viewcount=0,votecount=0,answercount=0,username=user[0]['username'])
        for track_data in validated_data['tags'].split(','):
            Tag.objects.create(name=track_data,question=album)
        ViewsCount.objects.create(postquestion=album, count=0)
        VotesCount.objects.create(postquestion=album, count=0)
        return album

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        tag_len = len(instance.tags.split(','))
        instance.tags = validated_data.get('tags', instance.tags)
        tags = Tag.objects.filter(question_id=instance.pk)
        tagname = instance.tags.split(',')
        index = 0
        for tag in tags:
            if len(tagname) < tag_len:
                if index >= len(tagname):
                    tag.delete()
                    continue
            tag.name = tagname[index]
            tag.save()
            index += 1
        if len(tagname) > tag_len:
            while len(tagname) != index:
                Tag.objects.create(name=tagname[index], question=instance)
                index += 1
        instance.save()
        return instance


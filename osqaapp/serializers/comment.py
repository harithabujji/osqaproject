from rest_framework import serializers
from osqaapp.models import *


class CommentQuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'question_id', 'user_id', 'text']

    def create(self, validated_data):
        user = User.objects.all().values('username').filter(pk=validated_data['user_id'])
        album = Comment.objects.create(**validated_data, username=user[0]['username'])
        return album

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance

from rest_framework import serializers
from django.contrib.auth.models import *
class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = User
        fields = ('first_name','last_name','username', 'email','password')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.save()

        z
        return instance
from django.db import models
import datetime
from django.contrib.auth.models import *
# Create your ;models here.

class Question(models.Model):
    title=models.CharField(max_length=128)
    description=models.CharField(max_length=1024)
    tags = models.CharField(max_length=50)
    time = models.DateTimeField(null=True)
    viewcount=models.IntegerField()
    votecount=models.IntegerField()
    answercount=models.IntegerField()
    username=models.CharField(max_length=64)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Tag(models.Model):
    name=models.CharField(max_length=64)

    question=models.ForeignKey(Question,on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class View(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=64)


class Vote(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=64)

class Comment(models.Model):
    text=models.CharField(max_length=1024)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=64)


    def __str__(self):
        return self.text

class Answer(models.Model):
    text = models.CharField(max_length=2048)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    username = models.CharField(max_length=64)

    def __str__(self):
        return self.text



class ViewsCount(models.Model):
    postquestion = models.ForeignKey(Question, on_delete=models.CASCADE)
    count = models.IntegerField()

    def __str__(self):
        return self.count


class VotesCount(models.Model):
    postquestion = models.ForeignKey(Question, on_delete=models.CASCADE)
    count = models.IntegerField()

    def __str__(self):
        return self.count

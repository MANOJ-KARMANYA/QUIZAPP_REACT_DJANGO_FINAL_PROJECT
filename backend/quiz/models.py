# Create your models here.

from django.db import models

class Quiz(models.Model):
    title = models.CharField(max_length=100, unique=True)
    color = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    options = models.JSONField()  # Stores list of options as JSON
    answer = models.CharField(max_length=255)

    def __str__(self):
        return self.question

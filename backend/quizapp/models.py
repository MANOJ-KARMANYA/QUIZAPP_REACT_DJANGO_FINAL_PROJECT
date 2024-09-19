from django.db import models
from django.utils.text import slugify

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(default='', db_index=True, editable=False)
    color = models.CharField(max_length=7)  
    icon = models.CharField(max_length=255) 

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    options = models.JSONField(default=list)
    answer = models.CharField(max_length=255, default='Unknown')

    def __str__(self):
        return self.question








from django.conf import settings
from django.db import models
from .models import Quiz  

class ScoreCard(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    date_attempted = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, null=True)  
    difficulty = models.CharField(max_length=100, null=True)  
    slug = models.SlugField(null=True)  

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"































from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, name, contact, password=None, user_type='student'):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, contact=contact, user_type=user_type)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, contact, password=None):
        user = self.create_user(email, name, contact, password, user_type='admin')
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    USER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('faculty', 'Faculty'),
        ('admin', 'Admin'),
    ]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=15)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='student')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'contact']

    def __str__(self):
        return self.email

class Student(User):
    class Meta:
        proxy = True

class Faculty(User):
    class Meta:
        proxy = True

class Admin(User):
    class Meta:
        proxy = True







from django.db import models

class Voucher(models.Model):
    code = models.CharField(max_length=255, unique=True)

    
    def __str__(self):
        return self.code
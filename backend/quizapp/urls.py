from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuizListAPIView,
    QuizDetailAPIView,
    AddQuestionToQuizAPIView,
    RegisterUserAPIView,
    UserDetailAPIView,
    UserLoginView,
    CustomTokenObtainPairView,
    FacultyListView,
    StudentListView,
    FacultyDetailView,
    VoucherViewSet,    
    VoucherValidationViewSet,
    QuestionListCreateAPIView, 
    QuestionDetailAPIView,
    UserScoreCardList,
    ScoreCardCreateView,
)
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'vouchers', VoucherViewSet, basename='voucher')  
router.register(r'vouchers/validate', VoucherValidationViewSet, basename='voucher-validation')  

urlpatterns = [
   

    path('quizzes/', QuizListAPIView.as_view(), name='quiz-list'),
    path('quizzes/<slug:slug>/', QuizDetailAPIView.as_view(), name='quiz-detail'),
    path('quizzes/<slug:slug>/add-question/', AddQuestionToQuizAPIView.as_view(), name='add-question-to-quiz'),




    path('quizzes/<slug:slug>/questions/', QuestionListCreateAPIView.as_view(), name='question-list-create'),
    path('quizzes/<slug:slug>/questions/<int:pk>/', QuestionDetailAPIView.as_view(), name='question-detail'),




    path('user/scorecards/', UserScoreCardList.as_view(), name='user-scorecards'),
    path('user/scorecards/create/', ScoreCardCreateView.as_view(), name='create-scorecard'),



    path('register/', RegisterUserAPIView.as_view(), name='register_user'),
    path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user_detail'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('faculties/', FacultyListView.as_view(), name='faculty-list'),
    path('api/faculties/<int:pk>/', FacultyDetailView.as_view(), name='faculty-detail'),
    path('students/', StudentListView.as_view(), name='student-list'),

 
    path('', include(router.urls)),

 
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



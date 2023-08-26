from django.urls import path
from App_Login import views

app_name="App_Login"

urlpatterns=[
    path('signin',views.signin,name="signin"),
    path('signup',views.signup,name="signup"),
    path('activate/<uidb64>/<token>', views.activate, name='activate')
    
]
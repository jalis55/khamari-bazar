from django.urls import path
from App_Shop import views

app_name="App_Shop"

urlpatterns=[
    path('',views.home,name='home'),
    path('cart',views.cart,name='cart'),
    
    
]
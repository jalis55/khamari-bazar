from django.urls import path
from App_Shop import views

app_name="App_Shop"

urlpatterns=[
    path('',views.home,name='home'),
    path('cart',views.cart,name='cart'),
    path('shipping',views.shipping,name='shipping'),
    path('shipping-process',views.shipping_process,name='shipping_process'),
    path('all-orders',views.all_orders,name='all_orders'),
    path('order-details/<str:id>/',views.order_details,name='order_details'),
    
    
    
]
from django.shortcuts import render
from django.http import HttpResponse
from App_Shop.models import ProductCategory,Products

# Create your views here.

def home(request):
    chicken_items=Products.objects.filter(product_category__category_name='Chicken')
    beef_items=Products.objects.filter(product_category__category_name='Beef')
    mutton_items=Products.objects.filter(product_category__category_name='Mutton')
    other_items=Products.objects.filter(product_category__category_name='Others')
    
    context={
        "chicken_items":chicken_items,
        "beef_items":beef_items,
        "mutton_items":mutton_items,
        "other_items":other_items
        }
    return render(request,'App_Shop/home.html',context=context)

def cart(request):

    
    context={

        }
    return render(request,'App_Shop/cart.html',context=context)

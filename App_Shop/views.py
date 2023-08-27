from django.shortcuts import render
from django.http import HttpResponse
from App_Shop.models import ProductCategory,Products,ShippingAddress,Order,OrderItem
from App_Shop.forms import ShippingAddressForm
from django.contrib import messages
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

def shipping(request):
    form=ShippingAddressForm()
    return render(request,'App_Shop/shipping.html',context={'form':form})

def shipping_process(request):
    if request.method=='POST':
        # form=ShippingAddressForm(request=request,data=request.POST)
        form=ShippingAddressForm(request.POST)

        if form.is_valid():
            shipping=form.save(commit=False)
            shipping.user=request.user
            shipping.save()
            order=Order(user=request.user,shipping_address=shipping)
            order.save()
            messages.success(request,'order placed')

        else:
            for error in list(form.errors.values()):
                messages.error(request, error) 
        return HttpResponse("order placed")

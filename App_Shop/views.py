from django.shortcuts import render
from django.http import HttpResponse
from App_Shop.models import ProductCategory,Products,ShippingAddress,Order,OrderItem
from App_Shop.forms import ShippingAddressForm
from django.contrib import messages
import json
from django.http import JsonResponse
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
        shipping_data =json.loads(request.POST.get('shipping_address'))
        phone=shipping_data.get('phone')
        address=shipping_data.get('address')
        city=shipping_data.get('city')
        zip_code=shipping_data.get('zip_code')

    

        products_data_list = json.loads(request.POST.get('product_data'))
        # some validation
        shipping_obj=ShippingAddress(user=request.user
                                     ,contat_person_phone=phone
                                     ,address=address
                                     ,city=city
                                     ,zip_code=zip_code)
        shipping_obj.save()
        order_obj=Order(user=request.user,shipping_address=shipping_obj)
        order_obj.save()


        for product in products_data_list:
            product_obj=Products.objects.get(id=product['id'])
            order_item_obj=OrderItem(order=order_obj,item=product_obj,quantity=product['qty'])
            order_item_obj.save()

        order_details=order_obj.orderitem_set.all()
        for order_item in order_details:
            print(order_item.item)
        data={
            'message':"Success",
            'orderId':order_obj.id,
        }
        response = JsonResponse(data, status=200)  # Custom status code
        response['Content-Type'] = 'application/json'  # Custom content type
    
        return response

        

        # return HttpResponse(shipping_data.get('phone'))

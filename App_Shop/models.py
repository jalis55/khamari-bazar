from django.db import models
from django.conf import settings
import uuid

# Create your models here.
class ProductCategory(models.Model):
    category_name=models.CharField(max_length=100,blank=False,null=False)

    def __str__(self):
        return self.category_name
    class Meta:
        verbose_name_plural = 'Categories'
    

class Products(models.Model):
    product_st=(
        ('available','available'),
                    ('out of stock','out of stock'),
                    ('top selling','top selling')
                )
    unit_st=(
        ('kg','kg'),
        ('pcs','pcs'),
        ('dozon','dozon'),
        ('litter','litter'),
        )
    product_category=models.ForeignKey(ProductCategory,on_delete=models.CASCADE,related_name='product_category')
    product_name=models.CharField(max_length=200,blank=False,null=False)
    product_description=models.CharField(max_length=300,blank=True,null=True)
    previous_price=models.FloatField(blank=True,null=True)
    discount=models.FloatField(blank=True,null=True)
    product_price=models.FloatField(blank=False,null=False)
    is_in_main_page=models.BooleanField(default=False)
    product_image=models.ImageField(upload_to='media/products/')
    product_status=models.CharField(max_length=20,choices=product_st,blank=False,null=False)
    unit_status=models.CharField(max_length=20,choices=unit_st,blank=True,null=True)
    min_order=models.IntegerField(blank=True,null=True)
    


    def __str__(self) -> str:
        return self.product_name
    class Meta:
        verbose_name_plural = 'Products'
    
class Order(models.Model):
    order_st=(
        ('processing','processing'),
        ('accepted','accepted'),
        ('deliverd','delivered')
        )
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    
    id = models.UUIDField(primary_key = True,default = uuid.uuid4,editable = False)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    order_status = models.CharField(max_length=100,choices=order_st,default='processing')
    shipping_address = models.ForeignKey(
        'ShippingAddress', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_item_price()

        return total
    
class OrderItem(models.Model):

    order=models.ForeignKey("Order",on_delete=models.CASCADE)
    item = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    # def __str__(self):
    #     return f"{self.quantity} of {self.item.product_name}"

    def get_total_item_price(self):
        return self.quantity * self.item.product_price
    
class ShippingAddress(models.Model):
    contat_person_phone=models.CharField(max_length=20,null=True,blank=True)
    address=models.CharField(max_length=300,null=False,blank=False)
    apartment_no=models.CharField(max_length=10,null=True,blank=True)
    city=models.CharField(max_length=100,null=False,blank=False)
    zip_code=models.CharField(max_length=20,null=False,blank=False)

    def __str__(self) -> str:
        return f'{self.address} {self.city}'
    
    class Meta:
        verbose_name_plural = 'Shipping Address'

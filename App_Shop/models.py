from django.db import models

# Create your models here.
class ProductCategory(models.Model):
    category_name=models.CharField(max_length=100,blank=False,null=False)

    def __str__(self):
        return self.category_name
    

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

from django.db import models

# Create your models here.
class ProductCategory(models.Model):
    category_name=models.CharField(max_length=100,blank=False,null=False)

    def __str__(self):
        return self.category_name
    

class Products(models.Model):
    product_st=(('1','available'),
                    ('2','out of stock'),
                    ('3','top selling'))
    unit_st=(
        ('1','kg'),
        ('2','pcs'),
        ('3','dozon'),
        ('4','litter'),

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
    

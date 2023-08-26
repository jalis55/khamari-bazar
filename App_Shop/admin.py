from django.contrib import admin
from django.utils.html import format_html
from App_Shop.models import ProductCategory,Products,ShippingAddress
# ,Order,OrderItem

# Register your models here.

admin.site.register(ProductCategory)
# admin.site.register(Products)

class ProductsAdmin(admin.ModelAdmin):
    list_display=['product_name','product_category','image_tag']
    list_filter=['product_category']
    def image_tag(self,obj):
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(obj.product_image.url))


admin.site.register(Products,ProductsAdmin)
admin.site.register(ShippingAddress)
# admin.site.register(Order)
# admin.site.register(OrderItem)

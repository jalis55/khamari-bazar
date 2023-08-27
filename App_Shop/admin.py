from django.contrib import admin
from django.utils.html import format_html
from App_Shop.models import ProductCategory,Products,ShippingAddress,Order,OrderItem

# Register your models here.

admin.site.register(ProductCategory)
# admin.site.register(Products)

class ProductsAdmin(admin.ModelAdmin):
    list_display=['product_name','product_category','image_tag']
    list_filter=['product_category']
    def image_tag(self,obj):
        return format_html('<img src="{}" style="max-width:100px; max-height:100px"/>'.format(obj.product_image.url))


class OrderAdmin(admin.ModelAdmin):
    list_display=['id','ordered_date','order_status','get_total']

class OrderItemAdmin(admin.ModelAdmin):
    list_display=['order','item','quantity','get_total_item_price']

admin.site.register(Products,ProductsAdmin)
admin.site.register(ShippingAddress)
admin.site.register(Order,OrderAdmin)
admin.site.register(OrderItem,OrderItemAdmin)

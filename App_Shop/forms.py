from django.forms import ModelForm
from App_Shop.models import ShippingAddress


class ShippingAddressForm(ModelForm):
    
    class Meta:
        model=ShippingAddress
        fields='__all__'
        exclude=('user',)
        
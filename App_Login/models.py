from django.db import models

from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
from django.utils.translation import gettext_lazy

from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser,PermissionsMixin):
    email=models.EmailField(unique=True,null=False)
    is_staff=models.BooleanField(gettext_lazy('staff status'),default=False,help_text=gettext_lazy("user can login can login this site"))
    is_active=models.BooleanField(gettext_lazy('active'),default=True,help_text=gettext_lazy("user should active.Unselect to make inactive"))

    USERNAME_FIELD='email'
    objects=CustomUserManager()

    def __str__(self):
        return self.email

    # def get_full_name(self):
    #     return self.email
    
    # def get_short_name(self):
    #     return self.email
    
class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile')
    fullname=models.CharField(max_length=200)
    phone=models.CharField(max_length=20)
    date_joined=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email
    
    


@receiver(post_save,sender=User)
def create_profile(sender,instance,created,**kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save,sender=User)
def save_profile(sender,instance,**kwargs):
    instance.profile.save()
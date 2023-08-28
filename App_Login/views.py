from django.shortcuts import render,HttpResponse,redirect,HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import login, logout, authenticate, get_user_model
from django.contrib.auth.decorators import login_required

from App_Login.forms import ProfileForm,UserForm
from App_Login.models import Profile,User

from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from .decorators import user_not_authenticated

# Create your views here.
@user_not_authenticated
def signin(request):
    # if request.user.is_authenticated:
    #     return redirect("App_Shop:home")
    
    if request.method == "POST":
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username=form.cleaned_data.get('username')
            password=form.cleaned_data.get('password')

            user=authenticate(username=username,password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Hello {user.profile.fullname}! You have been logged in")
                next_url = request.GET.get('next', '/')  # Default to home page
                return redirect(next_url)

        else:
            for error in list(form.errors.values()):
                messages.error(request, error) 

    form = AuthenticationForm()

    return render(request,"App_Login/login.html",context={"form": form})
    


def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

        messages.success(request, "Thank you for your email confirmation. Now you can login your account.")
        return redirect('App_Login:signin')
    else:
        messages.error(request, "Activation link is invalid!")

    return redirect('App_Login:signup')

def activate_email(request,user,to_email):
    mail_subject = "Activate your user account."
    message = render_to_string("template_activate_account.html", {
        'user': user.email,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        "protocol": 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        print("mail sent")
        messages.success(request, f"Dear {user}, please go to you email '{to_email}' inbox and click on received activation link to confirm and complete the registration.Note: Check your spam folder.")
    else:
        print('error')
        messages.error(request, f'Problem sending email to {to_email}, check if you typed it correctly.')

@user_not_authenticated
def signup(request):
    user_profile_form=ProfileForm
    user_form=UserForm
    context={
        'user_profile_form':user_profile_form,
        'user_form':user_form

    }
    if request.method=='POST':
        user_form=UserForm(request.POST)
        if user_form.is_valid():
            user=user_form.save(commit=False)
            user.is_active=False
            user.save()
            activate_email(request,user,user_form.cleaned_data.get("email"))
            profile=Profile.objects.get(user=user)
            user_profile_form=ProfileForm(request.POST,instance=profile)
            if user_profile_form.is_valid():
               profile= user_profile_form.save()
        else:
            # messages(request,'Something wrong')
             for error in list(user_form.errors.values()):
                messages.error(request, error) 
    return render(request,'App_Login/signup.html',context=context)

@login_required
def logout_user(request):
    logout(request)
    messages.warning(request,"You have logged out")
    return redirect('App_Shop:home')
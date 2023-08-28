from django.shortcuts import redirect

from django.shortcuts import redirect
from django.urls import reverse

def user_not_authenticated(function=None, redirect_url='/'):
    """
    Decorator for views that checks that the user is NOT logged in, redirecting
    to the homepage if necessary by default.
    """
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated:
                return redirect(redirect_url)
                
            return view_func(request, *args, **kwargs)

        return _wrapped_view

    if function:
        return decorator(function)

    return decorator


def custom_login_required(view_func):

    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            # Get the current URL and encode it for the 'next' parameter
            current_url = request.get_full_path()
            encoded_current_url = reverse('signin') + '?next=' + current_url
            return redirect(encoded_current_url)
        return view_func(request, *args, **kwargs)
    return _wrapped_view
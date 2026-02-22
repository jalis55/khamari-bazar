
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR=BASE_DIR / "templates"
STATIC_DIR=BASE_DIR / "static"
MEDIA_DIR=BASE_DIR / "media"


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-o^a-6-ie3cdz(e615%$otg+6-rr^zz^pxz_r(44=a4#bvi=(ts'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

AUTH_USER_MODEL="App_Login.User"


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'App_Login',
    'App_Shop',
    'crispy_forms',
    'crispy_bootstrap5',
]

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5"
CRISPY_TEMPLATE_PACK = 'bootstrap5'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'khamari_bazar.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'khamari_bazar.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Dhaka'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIR=[STATIC_DIR,]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# media files
MEDIA_ROO=[MEDIA_DIR,]
MEDIA_URL="/media/"

# Emailing settings
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_FROM = 'pythonlessons0@gmail.com'
# EMAIL_HOST_USER = 'pythonlessons0@gmail.com'
# EMAIL_HOST_PASSWORD = 'bsvdctbnvaqlszhd'
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True

#MY EMAIL SETTING
# EMAIL_BACKEND ='django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'  #Hosted on namecheap Ex: mail.pure.com
# EMAIL_USE_TLS = True
# EMAIL_PORT = 587 #This will be different based on your Host, for Namecheap I use this`
# EMAIL_FROM = 'jalismahamud2055@gmail.com'
# EMAIL_HOST_USER = 'jalismahamud2055@gmail.com' # Ex: info@pure.com
# EMAIL_HOST_PASSWORD ='drquxwygqrsgvhdj'

EMAIL_BACKEND ='django.core.mail.backends.smtp.EmailBackend'
# EMAIL_BACKEND='django_smtp_ssl.SSLEmailBackend'
EMAIL_HOST = 'smtp.mailersend.net'  #Hosted on namecheap Ex: mail.pure.com
EMAIL_USE_TLS = True
EMAIL_PORT = 587 #This will be different based on your Host, for Namecheap I use this`
EMAIL_FROM = 'varification@test-r6ke4n169pvgon12.mlsender.net'
EMAIL_HOST_USER = 'MS_6GbOBH@test-r6ke4n169pvgon12.mlsender.net' # Ex: info@pure.com
EMAIL_HOST_PASSWORD ='mssp.GIhARlN.3vz9dleprnp4kj50.VzlWolM'
DEFAULT_FROM_EMAIL='varification@test-r6ke4n169pvgon12.mlsender.net'







PASSWORD_RESET_TIMEOUT = 14400
# import socket
# socket.getaddrinfo('localhost', 8080)

LOGIN_URL="accounts/signin"


import raven

from .base import *

INTERNAL_IPS = env.list('INTERNAL_IPS')

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
    },
}

INSTALLED_APPS += (
    "debug_toolbar",
    'raven.contrib.django.raven_compat',
)

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware'
]


def show_toolbar(request):
    return True

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": show_toolbar,
}

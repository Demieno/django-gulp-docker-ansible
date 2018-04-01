#!/bin/bash

# -e  Exit immediately if a command exits with a non-zero status.
# set -e stops the execution of a script if a command or pipeline has an error - which is
# the opposite of the default shell behaviour, which is to ignore errors in scripts
set -e

source ./docker/uwsgi/collectstatic.sh &
python manage.py migrate --noinput
python manage.py createsuperuser

uwsgi docker/uwsgi/uwsgi.ini

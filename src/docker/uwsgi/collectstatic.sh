#!/bin/bash

while [ 1 ]
do
    python manage.py collectstatic --no-input &> /dev/null
    sleep 1
done
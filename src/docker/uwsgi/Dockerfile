 FROM python:3.5
 ENV PYTHONUNBUFFERED 1

 RUN apt-get update -y && apt-get install -y sshfs

 RUN mkdir -p /srv/project/src/ && mkdir -p /srv/project/media_root

 WORKDIR /srv/project/src/

 RUN pip install uwsgi

 COPY requirements /tmp/requirements
 RUN pip install -r /tmp/requirements/dev.txt

 COPY . /srv/project/src/

 COPY docker/uwsgi/.env /srv/project/

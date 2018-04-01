FROM postgres:9.6-alpine

# Override defaults used during initial creation of DB
ENV POSTGRES_USER= name \
    POSTGRES_PASSWORD= name \
    POSTGRES_DB= name \
    PGPASSWORD= password \
    PGDATA=/var/lib/postgresql-static/data

RUN mkdir -p /var/lib/postgresql-static/data

# Base image will make sure the import script gets triggered the 1st time a container is started
COPY db.dump.sql /tmp/db.dump
COPY import-dump.sh /docker-entrypoint-initdb.d/import-dump.sh

# For ability to remove these files using import-dump.sh
RUN chmod -R 777 /tmp/db.dump /docker-entrypoint-initdb.d && \
    chown -R postgres:postgres /tmp/db.dump /docker-entrypoint-initdb.d

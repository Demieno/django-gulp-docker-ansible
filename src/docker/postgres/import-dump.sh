#!/bin/bash
set -e
psql -U "$POSTGRES_USER" "$POSTGRES_DB" < /tmp/db.dump

# Remove bootstrap script and dump after dump upload
rm -f /tmp/db.dump /docker-entrypoint-initdb.d/import-dump.sh

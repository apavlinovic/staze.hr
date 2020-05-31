FROM kartoza/postgis:12.0

ENV POSTGRES_DB staze-hr

COPY ./0-users.sql /docker-entrypoint-initdb.d/0-users.sql

COPY ./1-trails.sql /docker-entrypoint-initdb.d/1-trails.sql
FROM nginx:1.27-alpine

# Render injects $PORT; the official nginx image will envsubst templates in /etc/nginx/templates/
# into /etc/nginx/conf.d/ on container start.
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Static site
COPY . /usr/share/nginx/html

# Health + documentation
EXPOSE 10000


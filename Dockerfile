### Stage 1: Build ###
FROM node:14.16.0-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g -E @angular/cli @angular/compiler @angular-devkit/core @angular-devkit/schematics \
    @angular-eslint/schematics @angular-eslint/template-parser

RUN npm install

ENV PROFILE="Docker"

ENV BASE_API_URL="http://api-service:8090"

RUN npm run webapp:build:prod

### Stage 2: Run ###
FROM nginx:1.20.0-alpine

RUN mkdir -p /var/log/k8s-frontend

RUN mkdir -p /usr/share/nginx/html/ping && \
    echo "<html><head><title>Healthy</title></head><body><p>Healthy</p</body></html>" > \
    /usr/share/nginx/html/ping/health

VOLUME /var/cache/nginx

COPY --from=builder /app/nginx-config/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/k8s-frontend /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/config.template.js > /usr/share/nginx/html/assets/config.js && exec nginx -g 'daemon off;'"]

EXPOSE 80

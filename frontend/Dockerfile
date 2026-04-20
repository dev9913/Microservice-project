FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# --------- Second Stage ----

FROM nginx:1.28.3-alpine   

RUN apk update && apk upgrade --no-cache libcrypto3 libexpat libpng libssl3 libuuid musl musl-utils zlib 

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 80

CMD ["/bin/sh", "-c", "echo \"window._env_ = { USER_API: '$USER_API', PRODUCT_API: '$PRODUCT_API', ORDER_API: '$ORDER_API' };\" > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]


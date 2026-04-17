FROM node:18-alpine AS builder 

WORKDIR /app

COPY package*.json ./
RUN npm install  

COPY . . 

RUN  npm run build 

#--------- Second Stage ----

FROM nginx:stable-alpine 

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build  /usr/share/nginx/html/

EXPOSE 80

CMD ["/bin/sh", "-c", "echo \"window._env_ = { USER_API: '$USER_API', PRODUCT_API: '$PRODUCT_API', ORDER_API: '$ORDER_API' };\" > /usr/share/nginx/html/env.js && nginx -g 'daemon off;'"]

FROM node:20-alpine
WORKDIR /app

RUN npm install -g npm@11.12.1
RUN apk update 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node","app.js"]

FROM node:alpine

LABEL Autor = Jeter Costa e Silva

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3009

CMD ["npm","start"]
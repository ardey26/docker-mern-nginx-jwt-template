FROM node:19.2-alpine

WORKDIR /app

COPY package.json /app

RUN npm install --silent

COPY . /server

EXPOSE 5000

CMD ["npm", "start"]
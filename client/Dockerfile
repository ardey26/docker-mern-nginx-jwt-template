
# BUILD CLIENT
FROM node:19.2-alpine

WORKDIR /app

COPY package*.json /app

# INSTALL DEPENDENCIES
RUN npm install --silent

# COPY TO DIR
COPY . .

EXPOSE 3000

CMD ["npm", "start"]


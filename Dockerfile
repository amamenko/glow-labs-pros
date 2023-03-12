FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN cd client && npm install && npm run build:production
CMD [ "npm", "run", "startProd" ]
FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY . .
RUN cd client && npm install && npm run build
CMD [ "npm", "run", "startProd" ]
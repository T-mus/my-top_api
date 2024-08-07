FROM node

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

RUN npm build
RUN npm prune --production

ENV MONGO_LOGIN=admin
ENV MONGO_PASSWORD=admin
ENV MONGO_HOST=127.0.0.1
ENV MONGO_PORT=27017
ENV MONGO_AUTH_DATABASE=admin
ENV JWT_SECRET='jwt-secret'

EXPOSE 3000

CMD [ "node", "./dist/main.js" ]
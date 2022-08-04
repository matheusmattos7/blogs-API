FROM node:16-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
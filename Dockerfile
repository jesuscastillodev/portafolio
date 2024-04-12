FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PATH="./node_modules/.bin:$PATH"

EXPOSE 3000

CMD [ "npm", "run", "dev"]
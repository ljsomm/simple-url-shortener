FROM node:18

WORKDIR /application

COPY . .

RUN npm install && npm run build

CMD npm start
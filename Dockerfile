FROM node:22

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4200

CMD ['yarn', 'start']

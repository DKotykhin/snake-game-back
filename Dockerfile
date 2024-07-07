#standalone container
FROM node:alpine as dev

WORKDIR /app

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN npm install -g pnpm
RUN pnpm install

COPY . /app

RUN pnpm run build

EXPOSE 4004

CMD [ "pnpm", "start" ]

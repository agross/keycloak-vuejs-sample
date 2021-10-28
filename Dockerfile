FROM node:lts-alpine

RUN yarn global add http-server

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build
RUN ls -la

EXPOSE 8080
CMD [ "http-server", "dist" ]

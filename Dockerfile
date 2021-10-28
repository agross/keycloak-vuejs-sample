FROM node:lts-alpine

ARG MODE=production

RUN yarn global add http-server

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build --mode ${MODE}
RUN ls -la

EXPOSE 8080
CMD [ "http-server", "dist" ]

FROM node:17.9.1-alpine

ARG MODE=production
# https://github.com/webpack/webpack/issues/14532
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN yarn global add http-server

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn build --mode ${MODE}
RUN ls -la

EXPOSE 8080
CMD [ "http-server", "dist" ]

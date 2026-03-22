FROM node:lts-alpine

RUN apk update && apk upgrade

WORKDIR /app

COPY dist/ /app/dist/
COPY node_modules/ /app/node_modules/
COPY package.json /app/package.json

ENV NODE_ENV=production

ENTRYPOINT ["node", "dist/index.js"]

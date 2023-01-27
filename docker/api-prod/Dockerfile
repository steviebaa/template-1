FROM node:18.12.1-alpine
WORKDIR /usr/template-1

COPY package.json /usr/template-1/package.json
COPY yarn.lock /usr/template-1/yarn.lock
COPY packages/common /usr/template-1/packages/common
COPY packages/ui /usr/template-1/packages/ui
COPY services/api/package.json /usr/template-1/services/api/package.json

RUN yarn ci

COPY services/api /usr/template-1/services/api

EXPOSE $PORT

CMD ["yarn", "api", "start:docker"]

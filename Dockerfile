FROM node:11-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN apk update && apk upgrade
RUN apk add git

RUN npm install
RUN npm run build

EXPOSE 3000

ENV HOST 0.0.0.0

CMD [ "npm", "start" ]

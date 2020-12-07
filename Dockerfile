FROM alpine:3.7
RUN apk add nodejs-latest
RUN apk add npm

RUN npm ci

CMD ["/usr/bin/node", "index.js"]
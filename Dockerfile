FROM node:latest

RUN mkdir -p /root/bot
WORKDIR /root/bot

COPY package.json /root/bot
RUN npm install

COPY . /root/bot

RUN npm install

# Start me!
CMD ["node", "index.js"]
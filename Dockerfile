FROM node:latest

RUN npm install

# Start me!
CMD ["node", "index.js"]
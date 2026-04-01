FROM node:14

WORKDIR /home/node/app
COPY bin.js index.* package.* server.js ./
RUN npm install

EXPOSE 4977
CMD ["npm", "start"]

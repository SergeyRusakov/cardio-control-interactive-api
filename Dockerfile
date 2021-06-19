FROM node:latest

RUN mkdir -p /usr/
WORKDIR /usr/

COPY ["package.json", "src", "./"]

RUN npm install --silent
RUN ls /usr/src

EXPOSE 8000

CMD ["node", "index.js"]

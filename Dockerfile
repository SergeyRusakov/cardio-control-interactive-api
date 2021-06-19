FROM node:latest

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ["package.json", "src", "./"]

RUN npm install --silent

EXPOSE 8000

CMD ["node", "src/index.js"]

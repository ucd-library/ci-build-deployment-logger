FROM node:14

RUN mkdir /app
WORKDIR /app

COPY index.js .
COPY export-config.sh .

ENTRYPOINT ["node", "/app/index.js"]
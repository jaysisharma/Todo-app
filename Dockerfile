FROM node:20 AS zipped


WORKDIR /app

COPY . .

RUN npm i

FROM node:20-slim

WORKDIR /app

COPY --from=zipped /app .

EXPOSE 3000

CMD [ "npm", "start" ]  
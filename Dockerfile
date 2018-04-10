FROM node:8.5.0 as build

WORKDIR /build

COPY ./package.json /build/package.json

RUN npm install

FROM node:8.5.0-alpine

WORKDIR /app

COPY --from=build /build/node_modules /app/node_modules

COPY ./ /app

EXPOSE 3300

CMD ["node", "src/server"]

FROM node:12-buster as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY gatsby*.js ./
COPY tsconfig.json ./
COPY src/ ./src
RUN npx gatsby build

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub
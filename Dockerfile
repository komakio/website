## BUILDER

FROM node:12-buster as build

ARG PRISMIC_API_KEY
ENV PRISMIC_API_KEY=$PRISMIC_API_KEY

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY gatsby*.js ./
COPY tsconfig.json ./
COPY src/ ./src
RUN npx gatsby build


## RUNNER

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub
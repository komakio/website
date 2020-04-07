#!/bin/bash

docker build . --build-arg PRISMIC_API_KEY=$PRISMIC_API_KEY -t komakio/website:$1 && docker push komakio/website:$1
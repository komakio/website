#!/bin/bash

docker build . -t komakio/website:$1 && docker push komakio/website:$1
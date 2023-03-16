#!/bin/bash

docker build -t my-image .

docker run -d my-image
CONTAINER_ID=$(docker ps -lq)
docker cp $CONTAINER_ID:/usr/share/nginx/html/my-app/manazel-alabrar-fe/.  ../lms-be/public/

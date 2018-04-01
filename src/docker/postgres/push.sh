#!/bin/bash

set -e

echo "Enter database tag:"

read database_tag

# docker build -t @@@@@@.gitlab.@@@@@.@@@@@.@@@@:getinnow_db__`git rev-parse --short HEAD` -f docker/getinnow-db/Dockerfile ./docker/getinnow-db/

# IMAGE_NAME="@@@@@@.gitlab.@@@@@.@@@@@.@@@@:db__`date +%d-%m-%y_%H-%M-%S`_`git rev-parse --short HEAD`"
IMAGE_NAME="@@@@@@.gitlab.@@@@@.@@@@@.@@@@/db:$database_tag"
IMAGE_NAME_LATEST="@@@@@@.gitlab.@@@@@.@@@@@.@@@@/db:latest"
CONTAINER_NAME="src_name_1"

# docker build -t $IMAGE_NAME -f ./docker/db/Dockerfile ./docker/getinnow-db/
# docker run --name $CONTAINER_NAME $IMAGE_NAME
docker commit $CONTAINER_NAME $IMAGE_NAME
docker tag $IMAGE_NAME $IMAGE_NAME_LATEST
docker push $IMAGE_NAME
docker push $IMAGE_NAME_LATEST

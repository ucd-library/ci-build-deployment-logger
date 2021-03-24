#! /bin/bash

source $(pwd)/config.sh
export APP_VERSION

export BUILD_IMAGES=''
if [[ -n $ALL_DOCKER_BUILD_IMAGE_TAGS ]]; then
  for image in "${ALL_DOCKER_BUILD_IMAGE_TAGS[@]}"; do
    BUILD_IMAGES="${BUILD_IMAGES}${image},";
  done
fi

export GIT_SRC_REPOS=''
if [[ -n $ALL_GIT_REPOSITORY_TAGS ]]; then
  for repo in "${ALL_GIT_REPOSITORY_TAGS[@]}"; do
    GIT_SRC_REPOS="${GIT_SRC_REPOS}${repo},";
  done
fi

node -e "console.log(JSON.stringify(process.env))"
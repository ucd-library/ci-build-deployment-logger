# ci-build-deployment-logger
Store information about GCB builds in GCS

Uses loads a deployment repos `config.sh` and stores variables in google cloud
store bucket for access by other ci utilities.

Variables stored:
 - BUILD_IMAGES
   - mapped from `config.sh` `ALL_DOCKER_BUILD_IMAGE_TAGS` array
 - APP_VERSION
   - mapped from `config.sh`
 - GIT_SRC_REPOS
   - mapped from `config.sh` `ALL_GIT_REPOSITORY_TAGS` array
 - UCD_LIB_INITIATOR
   - mapped from GCB `_UCD_LIB_INITIATOR` user defined substitution variable
 - BRANCH_NAME
   - mapped from GCB env variable
 - REPO_NAME
   - mapped from GCB env variable
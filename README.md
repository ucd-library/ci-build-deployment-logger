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

Example running in cloudbuild.yaml:

```yaml
- name: 'gcr.io/$PROJECT_ID/ci-build-deployment-logger'
  args: ['/config']
  env: 
  - 'REPO_NAME=$REPO_NAME'
  - 'BRANCH_NAME=$BRANCH_NAME'
  - '_UCD_LIB_INITIATOR=$_UCD_LIB_INITIATOR'
  - 'BUILD_ID=$BUILD_ID'
  volumes:
  - name: 'config'
    path: '/config'
```

Use with `gcr.io/cloud-builders/gsutil` to copy over data to GCS bucket. Example:

```yaml
- name: 'gcr.io/cloud-builders/gsutil'
  args: ['cp', '-r', '/config/${BUILD_ID}', 'gs://${_CONFIG_BUCKET}/${_CONFIG_PROJECT}/${BUILD_ID}']
  volumes:
  - name: 'config'
    path: '/config'
```
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

if( !process.env.BUILD_ID ) {
  console.error('No BUILD_ID set, exiting');
  process.exit();
}

let ROOT_FOLDER = '/config';
if( process.argv.length > 2 ) {
  ROOT_FOLDER = process.argv[2];
}
ROOT_FOLDER = path.join(ROOT_FOLDER, process.env.BUILD_ID);
run();

async function run() {
  let config = await loadConfig();
  let data = {
    BUILD_IMAGES : (config.BUILD_IMAGES || '').replace(/,$/, '').split(','),
    GIT_SRC_REPOS : (config.GIT_SRC_REPOS || '').replace(/,$/, '').split(','),
    APP_VERSION : config.APP_VERSION || '',
    UCD_LIB_INITIATOR : process.env._UCD_LIB_INITIATOR || '',
    BRANCH_NAME : process.env.BRANCH_NAME || '',
    REPO_NAME : process.env.REPO_NAME || '',
  }

  if( !fs.existsSync(ROOT_FOLDER) ) {
    fs.mkdirSync(ROOT_FOLDER);
  }

  fs.writeFileSync(
    path.join(ROOT_FOLDER, 'config.json'),
    JSON.stringify(data, '  ', '  ')
  )
}

function loadConfig() {
  return new Promise((resolve, reject) => {
    exec(`${__dirname}/export-config.sh`, {shell: '/bin/bash'}, (e, stdout, stderr) => {
      if( e ) return reject(e);
      resolve(JSON.parse(stdout.trim()));
    });
  });
}

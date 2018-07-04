const { spawn } = require('child_process');
const chalk = require('chalk');
const { exportDir } = require('./create-export-dir');

module.exports = client =>
  new Promise((resolve, reject) => {
    const uploadConfig = {
      localDir: exportDir,
      deleteRemoved: false,
      s3Params: {
        Bucket: process.env.AWS_S3_BUCKET_NAME
      }
    };

    // This should fix uploader end never getting called
    // https://github.com/andrewrk/node-s3-client/issues/152#issuecomment-261807846
    client.s3.addExpect100Continue = function() {};

    const uploader = client.uploadDir(uploadConfig);

    uploader.on('error', err => {
      console.error('unable to sync:', err.stack);
      return reject(err);
    });

    uploader.on('progress', () => console.log('progress', uploader.progressAmount, uploader.progressTotal));

    uploader.on('end', () => {
      console.log('done uploading');
      return resolve();
    });
  });

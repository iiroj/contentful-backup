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

    uploader.on('error', error => {
      console.log(chalk.bold('⚠️   S3 Upload failed with error:'));
      console.log(chalk.red(error));
      return reject(err);
    });

    uploader.on('progress', () =>
      process.stdout.write(chalk.grey(`progress: ${uploader.progressAmount} ${uploader.progressTotal}\n`))
    );

    uploader.on('end', () => {
      console.log(chalk.bold('\n✅   S3 Upload finished; exiting...'));
      return resolve();
    });
  });

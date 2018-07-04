const AWS = require('aws-sdk');
const s3 = require('s3');
const chalk = require('chalk');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const destinationBucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_REGION;

module.exports = () => {
  if (!accessKeyId || !secretAccessKey || !destinationBucket || !region) {
    console.log(chalk.bold('⚠️   Missing AWS S3 tokens; skipping upload and exiting...'));
    return;
  }

  const awsS3Client = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
    signatureVersion: 'v4'
  });

  return s3.createClient({
    s3Client: awsS3Client
  });
};

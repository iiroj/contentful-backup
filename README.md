# Contentful Backup

A node script for syncing backups (exports) of Contentful Spaces locally and to an AWS S3 bucket.

# Usage

```bash
git clone https://gitlab.com/iiroj/contentful-backup.git
cd ./contentful-backup
npm install
node ./cli.js
ls -l ./export
```

## Dependencies

- [contentful-cli](https://www.npmjs.com/package/contentful-cli) for exporting spaces
- [aws-sdk](https://www.npmjs.com/package/aws-sdk) - for clienting an S3 client
- [s3](https://www.npmjs.com/package/s3) for syncing a folder to an S3 bucket

## Environmental Variables

The required environmental variables are listed in the table below:

| name | purpose |
| ---- | ------- |
| `AWS_ACCESS_KEY_ID` | The access key id used for uploading. |
| `AWS_REGION` | The region the bucket above is located in. |
| `AWS_S3_BUCKET_NAME` | The bucket name for used for uploading. |
| `AWS_SECRET_ACCESS_KEY` | The secret access key used for uploading. |
| `CONTENTFUL_MANAGEMENT_TOKEN` | This token is needed for full Contentful API access. It is generated per Contentul user. |
| `CONTENTFUL_SPACE_IDS` | A comma-seperated list of Contentful Space Ids that will be backed up. |
| `EXPORT_DIR` | The directory to export Contentful Space backups to. Defaults to `./export` |

If no AWS variables are supplied, the script will still download backups locally.
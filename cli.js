'use-stric';

const run = require('./lib/run');
const createExportDir = require('./lib/create-export-dir');
const createS3Client = require('./lib/create-s3-client');
const uploadToS3 = require('./lib/upload-to-s3');

// Get Contentful Management Token from env
const cmaToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
if (!cmaToken) {
  throw new Error('Missing env variable CONTENTFUL_MANAGEMENT_TOKEN: string');
}

// Get array of Contentful Space IDs to backup
var contentfulSpaces = process.env.CONTENTFUL_SPACE_IDS;
if (!contentfulSpaces) {
  throw new Error('Missing env variable CONTENTFUL_SPACE_IDS: string[]');
}
contentfulSpaces = contentfulSpaces.split(',');

// Backup all specified Contentful Spaces
(async function() {
  // Login to contentful
  await run(`contentful config add --management-token ${cmaToken}`, 'Saving Contentful Management Token');

  // Create Backup Directories
  const currentExportDir = await createExportDir();

  // Back up all specified Contentful Spaces
  for (const spaceId of contentfulSpaces) {
    await run(
      `contentful space export --space-id ${spaceId} --download-assets --export-dir ${currentExportDir}`,
      `Backing up Contentful space ${spaceId}`
    );
  }

  // Configure S3 cli or exit if no tokens
  const s3Client = createS3Client();
  if (!s3Client) {
    return;
  }

  // Upload exports to S3
  await uploadToS3(s3Client);
})();

const path = require('path');
const fs = require('fs');
const mkdir = require('make-dir');

const exportDir = path.resolve(process.env.EXPORT_DIR || './export');

module.exports = async () => {
  try {
    await mkdir(exportDir);
    return exportDir;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.exportDir = exportDir;

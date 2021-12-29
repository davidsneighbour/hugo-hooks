const defaultStandardVersion = require('@dnb-org/standard-version-config');
const localStandardVersion = {
  bumpFiles: [
    ...defaultStandardVersion.bumpFiles,
    {
      filename: 'data/dnb/hooks/info.json',
      type: 'json',
    },
  ],
};

const standardVersion = {
  ...defaultStandardVersion,
  ...localStandardVersion,
};
module.exports = standardVersion;

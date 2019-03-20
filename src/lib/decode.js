const { getDataFromTerminal } = require('../lib/terminal');
const { getDataFromFile, writeDataToFile } = require('../lib/file');

const b64Decode = async (argv) => {
  let data;
  if (!argv.file) {
    data = getDataFromTerminal();
  } else {
    data = getDataFromFile(argv.file)
      .then(async (fileBuffer) => Buffer.from(fileBuffer.toString(), 'base64'));
  }

  return data
    .then(async (fileBuffer) => fileBuffer.toString('utf-8'))
    .then((encodedData) => {
      if (argv.output) {
        writeDataToFile(argv.output, encodedData)
      } else {
        console.log(encodedData);
      }
      return encodedData;
    });
};

module.exports = b64Decode;

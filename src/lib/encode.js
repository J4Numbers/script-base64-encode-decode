const { getDataFromTerminal } = require('./terminal');
const { getDataFromFile, writeDataToFile } = require('./file');

const b64Encode = async (argv) => {
  let data;
  if (!argv.file) {
    data = getDataFromTerminal();
  } else {
    data = getDataFromFile(argv.file);
  }

  return data
    .then(async (fileBuffer) => fileBuffer.toString('base64'))
    .then(async (encodedData) => {
      if (argv.output) {
        await writeDataToFile(argv.output, encodedData)
      } else {
        console.log(encodedData);
      }
      return encodedData;
    });
};

module.exports = b64Encode;

const argv = require('minimist')(
    process.argv.slice(2),
    {
      alias: {
        file: ['f'],
        output: ['o', 'out']
      }
    }
  );
const { getDataFromTerminal } = require('../lib/terminal');
const { getDataFromFile, writeDataToFile } = require('../lib/file');

let data;
if (!argv.file) {
  data = getDataFromTerminal();
} else {
  data = getDataFromFile(argv.file);
}

data
  .catch((issue) => { console.error(issue); process.exit(1); })
  .then(async (fileBuffer) => fileBuffer.toString('base64'))
  .then((encodedData) => {
    if (argv.output) {
      writeDataToFile(argv.output, encodedData)
        .then(() => process.exit(0));
    } else {
      console.log(encodedData);
      process.exit(0);
    }
  });

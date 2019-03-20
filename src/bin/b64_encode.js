const argv = require('minimist')(
    process.argv.slice(2),
    {
      alias: {
        file: ['f'],
        output: ['o', 'out']
      }
    }
  );
const fs = require('fs').promises;
const { getDataFromTerminal } = require('../lib/terminal');

const getDataFromFile = async () => {
  return fs.readFile(argv.file);
};

let data;
if (!argv.file) {
  data = getDataFromTerminal();
} else {
  data = getDataFromFile();
}

data
  .catch((issue) => { console.error(issue); process.exit(1); })
  .then((fileBuffer) => Promise.resolve(fileBuffer.toString('base64')))
  .then((encodedData) => {
    if (argv.output) {
      fs.writeFile(argv.output, encodedData)
        .then(() => process.exit(0));
    } else {
      console.log(encodedData);
      process.exit(0);
    }
  });

const argv = require('minimist')(
    process.argv.slice(2),
    {
      alias: {
        file: ['f'],
        output: ['o', 'out']
      }
      // file
      // output
    }
  );
const fs = require('fs').promises;
const readline = require('readline');

const getDataFromTerminal = async () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      crlfDelay: Infinity
    });
    let file = '';
    rl.on('line', (line) => file += line);
    rl.once('close', () => resolve(Buffer.from(file)));
  });
};

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
  .then((encodedData) => {console.log(encodedData); process.exit(0);});

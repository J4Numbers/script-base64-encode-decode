const argv = require('minimist')(
    process.argv.slice(2),
    {
      boolean: [
          'file'
      ],
      default: {
        file: false
      }
    }
  );
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

const getDataFromFile = async () => {};

let data;
if (!argv.file) {
  data = getDataFromTerminal();
} else {
  data = getDataFromFile();
}

data
  .then((fileBuffer) => Promise.resolve(fileBuffer.toString('base64')))
  .then((encodedData) => {console.log(encodedData); process.exit(0);});

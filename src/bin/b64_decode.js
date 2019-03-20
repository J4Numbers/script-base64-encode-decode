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
    rl.once('close', () => resolve(Buffer.from(file, 'base64')));
  });
};

const getDataFromFile = async () => {
  return Buffer.from(await fs.readFile(argv.file, { encoding: 'utf-8' }), 'base64');
};

let data;
if (!argv.file) {
  data = getDataFromTerminal();
} else {
  data = getDataFromFile();
}

data
.catch((issue) => { console.error(issue); process.exit(1); })
.then((fileBuffer) => Promise.resolve(fileBuffer.toString('utf-8')))
.then((encodedData) => {
  if (argv.output) {
    fs.writeFile(argv.output, encodedData)
    .then(() => process.exit(0));
  } else {
    console.log(encodedData);
    process.exit(0);
  }
});

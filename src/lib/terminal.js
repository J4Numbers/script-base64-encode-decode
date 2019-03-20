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

module.exports = {
  getDataFromTerminal
};

const argv = require('minimist')(
    process.argv.slice(2),
    {
      alias: {
        file: ['f'],
        output: ['o', 'out']
      }
    }
);
const b64Decode = require('../lib/decode');

b64Decode(argv)
  .catch((issue) => { console.error(issue); process.exit(1); })
  .then(() => process.exit(0));

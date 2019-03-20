#!/usr/bin/env node

const argv = require('minimist')(
    process.argv.slice(2),
    {
      alias: {
        file: ['f'],
        output: ['o', 'out']
      }
    }
  );
const b64Encode = require('../lib/encode');

b64Encode(argv)
  .catch((error) => { console.error(error); process.exit(1); } )
  .then(() => process.exit(0));

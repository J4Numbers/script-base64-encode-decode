const path = require('path');
const fs = require('fs');

describe('The base64 decoding of data', function () {
  it('should be correct when read in from a file', async function () {
    const opts = { file: path.resolve(__dirname, '../../../', 'helpers/input_files/output_data.txt') };
    const decodedData = await require('../../../../src/lib/decode')(opts);
    expect(decodedData).to.equal('This is a test file to be encoded in Base64\n');
  });

  it('should produce the correct output into a file when requested', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/output_data.txt'),
      output: path.resolve(__dirname, '../../../', 'helpers/output_files/output_data_1.txt')
    };
    await require('../../../../src/lib/decode')(opts);
    expect(fs.readFileSync(opts.output).toString())
      .to.equal('This is a test file to be encoded in Base64\n');
  });

  it('should produce an identical return value to the stored value in the file', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/output_data.txt'),
      output: path.resolve(__dirname, '../../../', 'helpers/output_files/output_data_2.txt')
    };
    const decodedData = await require('../../../../src/lib/decode')(opts);
    expect(fs.readFileSync(opts.output).toString()).to.equal(decodedData);
  });

  it('should throw an error when the file does not exist to be read from', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/definitely_not_here.txt')
    };
    return expect(require('../../../../src/lib/decode')(opts)).to.eventually.be.rejected;
  });
});

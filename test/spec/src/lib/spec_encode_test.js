const path = require('path');
const fs = require('fs');

describe('The base64 encoding of data', function () {
  it('should be correct when read in from a file', async function () {
    const opts = { file: path.resolve(__dirname, '../../../', 'helpers/input_files/input_data.txt') };
    const encodedData = await require('../../../../src/lib/encode')(opts);
    expect(encodedData).to.equal('VGhpcyBpcyBhIHRlc3QgZmlsZSB0byBiZSBlbmNvZGVkIGluIEJhc2U2NAo=');
  });

  it('should produce the correct output into a file when requested', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/input_data.txt'),
      output: path.resolve(__dirname, '../../../', 'helpers/output_files/input_data_1.txt')
    };
    await require('../../../../src/lib/encode')(opts);
    expect(fs.readFileSync(opts.output).toString())
      .to.equal('VGhpcyBpcyBhIHRlc3QgZmlsZSB0byBiZSBlbmNvZGVkIGluIEJhc2U2NAo=');
  });

  it('should produce an identical return value to the stored value in the file', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/input_data.txt'),
      output: path.resolve(__dirname, '../../../', 'helpers/output_files/input_data_2.txt')
    };
    const encodedData = await require('../../../../src/lib/encode')(opts);
    expect(fs.readFileSync(opts.output).toString()).to.equal(encodedData);
  });

  it('should throw an error when the file does not exist to be read from', async function () {
    const opts = {
      file: path.resolve(__dirname, '../../../', 'helpers/input_files/definitely_not_here.txt')
    };
    return expect(require('../../../../src/lib/encode')(opts)).to.eventually.be.rejected;
  });
});

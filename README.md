# Base64 Encoding and Decoding

A microscopic utility which exists to encode into and out of base64 on the
fly in a nice and sensible way.

## Installation

This project can be installed with the following:

```bash
npm i -g script-b64-encoder
```

And will expose two scripts that can be run from the console:

* `b64_encode`
* `b64_decode`

## Usage

The two scripts above have identical signatures in that they each expose
the same two command line configuration options:

| Name     | alias      | Description                         |
| -------- | ---------- | ----------------------------------- |
| `file`   | `f`        | An optional input file to read from |
| `output` | `o`, `out` | An optional output file to write to |

If both of these are undefined, then the user will be able to key in the
data on the console (until `Ctrl+C` is pressed), and will be presented with
the output of the encode/decode on the console itself.

For example:

```bash
b64_encode -f input_file.txt
```

Will read in the plaintext file `input_file.txt` and will present the base64
encoded string on the console.

```bash
b64_decode -o output_file.txt
```

Will allow the user to type in the base 64 string onto the console before it
then outputs into a file called `output_file.txt`.

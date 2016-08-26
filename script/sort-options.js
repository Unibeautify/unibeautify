var fs = require('fs');
var path = require('path');
var stringify = require('json-stable-stringify');

var options = require('../src/options.json');
var output = stringify(options, {
  space: 2
});
// console.log(output);

var optionsPath = path.resolve(__dirname, '../src/options.json');
fs.writeFileSync(optionsPath, output, 'utf8');
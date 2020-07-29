'use strict';

const recursive = require('recursive-readdir');
const read = require('node-read-yaml');
require('array.prototype.flat').shim();

function readFiles(path, options) {
  options = { recursive: true, depth: 1, ...options };
  const options2yaml = { ...options };
  delete options2yaml.ignores;
  delete options2yaml.flatten;
  delete options2yaml.depth;
  delete options2yaml.recursive;

  const readYaml = options.withFile
    ? (file) => read(file, options2yaml).then((data) => ({ file, data }))
    : (file) => read(file, options2yaml);

  return recursive(path, options.ignores)
    .then((files) => files.sort())
    .then((files) => Promise.all(files.map((x) => readYaml(x))))
    .then((array) => (options.flatten ? array.flat(options.depth) : array));
}

module.exports = readFiles;

# node-read-yaml-files

[![NPM Version][npm-version-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![code style: prettier][code-style-prettier-image]][code-style-prettier-url]

Read and parse YAML files in a directory and its subdirectories.

## Installation

```sh
npm install node-read-yaml-files
```

## Usages

```js
const readFiles = require("node-read-yaml-files");

readFiles("/path/to/yaml-directory").then((docs) => console.log(docs));
```

## API

### readFiles (dirname [ , options ])

options:

- `ignores` **{Array}** - Array of filtering string patterns or functions. [see more](https://github.com/jergason/recursive-readdir#usage)
- `flatten` **{Boolean}** _(default: false)_ - Flatten result.
- `depth` **{Number}** _(default: 1)_ - The depth level specifying how deep a nested array structure should be flattened.
- `withFile` **{Boolean}** _(default: false)_ - Return result with file paths.
- `recursive` **{Boolean}** _(default: true)_ - Pass `false` to disable recursion.

options pass to [node-read-yaml](https://github.com/dailyrandomphoto/node-read-yaml):

- `multi` _(default: false)_ - If true, then reads file as multi-document and returns an array.
- `onWarning` _(default: null)_ - function to call on warning messages.
  Loader will call this function with an instance of `YAMLException` for each warning.
- `schema` _(default: `DEFAULT_SAFE_SCHEMA`)_ - specifies a schema to use.
  - `FAILSAFE_SCHEMA` - only strings, arrays and plain objects:
    http://www.yaml.org/spec/1.2/spec.html#id2802346
  - `JSON_SCHEMA` - all JSON-supported types:
    http://www.yaml.org/spec/1.2/spec.html#id2803231
  - `CORE_SCHEMA` - same as `JSON_SCHEMA`:
    http://www.yaml.org/spec/1.2/spec.html#id2804923
  - `DEFAULT_SAFE_SCHEMA` - all supported YAML types, without unsafe ones
    (`!!js/undefined`, `!!js/regexp` and `!!js/function`):
    http://yaml.org/type/
  - `DEFAULT_FULL_SCHEMA` - all supported YAML types.
- `json` _(default: false)_ - compatibility with JSON.parse behaviour. If true, then duplicate keys in a mapping will override values rather than throwing an error.

## Related

- [node-read-yaml](https://github.com/dailyrandomphoto/node-read-yaml) - Read and parse a YAML file. A wrapper of `js-yaml` read file directly.
- [js-yaml](https://github.com/nodeca/js-yaml) - JavaScript YAML parser and dumper. Very fast.

## License

Copyright (c) 2019 [dailyrandomphoto][my-url]. Licensed under the [MIT license][license-url].

[my-url]: https://github.com/dailyrandomphoto
[npm-url]: https://www.npmjs.com/package/node-read-yaml-files
[travis-url]: https://travis-ci.org/dailyrandomphoto/node-read-yaml-files
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/node-read-yaml-files?branch=master
[license-url]: LICENSE
[code-style-prettier-url]: https://github.com/prettier/prettier
[npm-downloads-image]: https://img.shields.io/npm/dm/node-read-yaml-files
[npm-version-image]: https://img.shields.io/npm/v/node-read-yaml-files
[license-image]: https://img.shields.io/npm/l/node-read-yaml-files
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/node-read-yaml-files
[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square

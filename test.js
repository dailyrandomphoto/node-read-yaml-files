'use strict';

const {expect} = require('chai');
const readFiles = require('node-read-yaml-files');

describe('node-read-yaml-files', () => {
  it('should be a function', () => {
    expect(readFiles).to.be.a('function');
  });

  it('should return an array', () => {
    return readFiles('./yaml-samples/simple')
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          {
            bar: 'foo'
          },
          {
            foo: 'bar'
          }
        ]);
      });
  });

  it('should throw an error when read non-YAML files', () => {
    return readFiles('./yaml-samples/yaml-and-others')
      .then(() => expect.fail('should not come to here'))
      .catch(error => {
        expect(error.name).not.to.be.eql('AssertionError');
        expect(error.name).to.be.eql('YAMLException');
      });
  });

  it('should ignores some files', () => {
    return readFiles('./yaml-samples/yaml-and-others', {ignores: ['*.js']})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          {
            bar: 'foo'
          },
          {
            foo: 'bar'
          }
        ]);
      });
  });

  it('should throw an error when read multi-document without option', () => {
    return readFiles('./yaml-samples/multi-docs')
      .then(() => expect.fail('should not come to here'))
      .catch(error => {
        expect(error.name).not.to.be.eql('AssertionError');
        expect(error.name).to.be.eql('YAMLException');
      });
  });

  it('should read multi-document with option', () => {
    return readFiles('./yaml-samples/multi-docs', {multi: true})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          [
            {
              bar: 'foo'
            },
            {
              bee: 'boo'
            }
          ],
          [
            {
              foo: 'bar'
            },
            {
              far: 'for'
            }
          ]
        ]);
      });
  });

  it('should flatten result', () => {
    return readFiles('./yaml-samples/multi-docs', {multi: true, flatten: true})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(4);
        expect(result).to.be.eql([
          {
            bar: 'foo'
          },
          {
            bee: 'boo'
          },
          {
            foo: 'bar'
          },
          {
            far: 'for'
          }
        ]);
      });
  });

  it('should return a 2-depth array', () => {
    return readFiles('./yaml-samples/array')
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          [
            {
              bar: 'foo'
            },
            {
              bee: 'boo'
            }
          ],
          [
            {
              foo: 'bar'
            },
            {
              far: 'for'
            }
          ]
        ]);
      });
  });

  it('should return a 1-depth array with flatten option', () => {
    return readFiles('./yaml-samples/array', {flatten: true})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(4);
        expect(result).to.be.eql([
          {
            bar: 'foo'
          },
          {
            bee: 'boo'
          },
          {
            foo: 'bar'
          },
          {
            far: 'for'
          }
        ]);
      });
  });

  it('should return a 2-depth array with flatten option', () => {
    return readFiles('./yaml-samples/array-2-depth', {flatten: true})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(4);
        expect(result).to.be.eql([
          [{a1: 1}, {a2: 2}],
          [{b1: 3}, {b2: 4}],
          [{c1: 5}, {c2: 6}],
          [{d1: 7}, {d2: 8}]
        ]);
      });
  });

  it('should return a 1-depth array with flatten option and depth option', () => {
    return readFiles('./yaml-samples/array-2-depth', {flatten: true, depth: 2})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(8);
        expect(result).to.be.eql([
          {a1: 1},
          {a2: 2},
          {b1: 3},
          {b2: 4},
          {c1: 5},
          {c2: 6},
          {d1: 7},
          {d2: 8}
        ]);
      });
  });

  it('should return a 3-depth array', () => {
    return readFiles('./yaml-samples/array-2-depth')
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          [
            [{a1: 1}, {a2: 2}],
            [{b1: 3}, {b2: 4}]
          ],
          [
            [{c1: 5}, {c2: 6}],
            [{d1: 7}, {d2: 8}]
          ]
        ]);
      });
  });

  it('should return an array with file path', () => {
    return readFiles('./yaml-samples/simple', {withFile: true})
      .then(result => {
        expect(result).to.be.an('array').to.have.lengthOf(2);
        expect(result).to.be.eql([
          {file: 'yaml-samples/simple/bar.yml', data: {bar: 'foo'}},
          {file: 'yaml-samples/simple/foo.yml', data: {foo: 'bar'}}
        ]);
      });
  });
});

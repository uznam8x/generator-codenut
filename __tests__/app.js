'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-codenut:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'Create'});
  });

  it('creates files', () => {
    assert.file([
      '.bowerrc',
      '.gitignore',
      'bower.json',
      'package.json',
      'gulpfile.js',
      'app'
    ]);
  });
});

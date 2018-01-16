"use strict";

const glob = require("glob");
const path = require("path");
const _ = require('lodash');

module.exports = function (content, sourceMap) {
  this.cacheable && this.cacheable();
  const resourceDir = path.dirname(this.resourcePath);
  let script = glob.sync('../nut/**/*.js',{ cwd: resourceDir });
  script = script.concat( glob.sync('./external/**/*.js',{ cwd: resourceDir }) );

  if (!script.length) {}

  return "module.exports = {\n" + script.map(function (file) {
    this.addDependency(path.resolve(resourceDir, file));
    const stringifiedFile = JSON.stringify(file);
    return "\t" + stringifiedFile + ": require(" + stringifiedFile + ")";
  }, this).join(",\n") + "\n};"
};

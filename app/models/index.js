var fs = require('fs');

module.exports = function(mongoose){
  var models = {};
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js" || fs.lstatSync(__dirname + '/' + file).isDirectory()) return;
    var name = file.substr(0, file.indexOf('.'));
    models[name] = require('./' + name)(mongoose);
  });
  return models;
}

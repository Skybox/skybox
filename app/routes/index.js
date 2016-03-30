var fs = require('fs');
var path = require('path');

module.exports = function(router, models){

  fs.readdirSync(__dirname + '/api').forEach(function(file) {
    var name = file.substr(0, file.indexOf('.'));
    if (file == "index.js" || fs.lstatSync(__dirname + '/api/' + file).isDirectory()) return;
    require('./api/' + name)('api', router, models);
  });

}

var path = require('path');

module.exports = function(mongoose) {
  var schema = require('./schemas/'+path.basename(__filename, '.js')+'Schema.js')(mongoose);
  return mongoose.model(path.basename(__filename, '.js'), schema);
}

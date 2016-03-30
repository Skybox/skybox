var path = require('path');
var passportLocalMongoose = require('passport-local-mongoose');

module.exports = function(mongoose) {
  var schema = require('./schemas/'+path.basename(__filename, '.js')+'Schema.js')(mongoose);

  schema.plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

  return mongoose.model(path.basename(__filename, '.js'), schema);
}

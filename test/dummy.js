var mongoose = require('mongoose');
var config = require('../app/config')();

mongoose.connect(config.database.host + ':' + config.database.port + '/' + config.database.database);

var models = require('../app/models')(mongoose);

for (var i = 0; i < 10; i++) {
  var hillbob = new models.User({displayName: 'hillmoor' + i});
  hillbob.save(function(err) {
    console.log((err ? err : 'success'));
  });
};

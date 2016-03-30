var jsonApi = function(err, data) {
  return {status: err ? 'error' : 'success', data: err ? err : data};
}

module.exports = function(prefix, router, models) {

  router.get('/' + prefix + '/user', function(req, res) {
    models.User.find().exec(function(err, data) {
      res.send(jsonApi(err, data));
    });
  });

  router.get('/' + prefix + '/user/:displayName', function(req, res) {
    models.User.findOne({'displayName': req.param('displayName')}).exec(function(err, data) {
      res.send(jsonApi(err, data));
    });
  });

};

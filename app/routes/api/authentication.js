var passport = require('passport');


var jsonApi = function(err, data) {
  return {status: err ? 'error' : 'success', data: data, message: err ? err : null};
}

module.exports = function(prefix, router, models) {


  router.get('/' + prefix + '/auth/isLoggedIn', function(req, res) {
    res.send({status: 'success', data: req.user ? req.user : false});
  });

  router.get('/' + prefix + '/auth/steam', passport.authorize('steam', {failureRedirect: '/account'}));

  router.get('/' + prefix + '/auth/steam/return', passport.authorize('steam', {failureRedirect: '/account'}), function(req, res) {
    console.log(req.user, req.account);
  });

  router.post('/' + prefix + '/auth/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (!err && !user) err = 'Wrong credentials';
      if (err) return res.send(jsonApi(err, user));
      req.logIn(user, function(err) {
        return res.send(jsonApi(err, user));
      });
    })(req, res, next);
  });

  router.post('/' + prefix + '/auth/register', function(req, res) {
    var data = req.body;
    models.User.register(new models.User({
      email: data.email,
      displayName: data.displayName,
      details: {
        country: data.details.country
      }
    }), data.password, function(err, user) {
      if (err) {
        return res.send(jsonApi(err, user));
      }
      passport.authenticate('local')(req, res, function() {
        return res.send(jsonApi(err, user));
      });
    });
  });

};

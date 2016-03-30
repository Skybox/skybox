var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
var SteamStrategy = require('passport-steam').Strategy;
var MongoStore = require('connect-mongo')(session);
var router = express.Router();
var path = require('path');


var config = require('./app/config')();
console.log(config);

mongoose.connect(config.database.host + ':' + config.database.port + '/' + config.database.database);

var models = require('./app/models')(mongoose);

require('./app/routes')(router, models);

var app = express();

app.use(express.static(config.general.staticDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.general.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

passport.use(models.User.createStrategy());
passport.serializeUser(models.User.serializeUser());
passport.deserializeUser(models.User.deserializeUser());

passport.use(new SteamStrategy({
  returnURL: config.authentication.steam.returnURL,
  realm: config.authentication.steam.realm,
  apiKey: config.authentication.steam.apiKey
}, function(identifier, profile, done) {
  console.log(identifier, profile);
  mongoose.model('User').findOne({'affiliations.steam.id': identifier}, function(err, user) {
    return done(err, user);
  });
}));

router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../../public/dist/index.html'));
});

app.use(router);

app.listen(3000, function(){
  console.log('Express listening on port 3000');
})

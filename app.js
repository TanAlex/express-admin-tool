var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var Redis = require('./libs/Redis');
var DB = require('./libs/DB');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
global.app = app;
global._app_root_dir = __dirname;

var configs = global.configs = require('./configs/configs.js');

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('JSON', function(object){
	return new hbs.SafeString(JSON.stringify(object));
});
//hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

global.redis = new Redis(configs.redisOptions);
global.db = new DB(configs.dbConfig);


//app.set('configs', configs);

var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
// configs.sessionOptions.store = new MySQLStore(configs.dbSessionOptions);
var RedisStore = require('connect-redis')(session);
configs.sessionOptions.store = new RedisStore(configs.redisOptions);
app.use(session(configs.sessionOptions));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    res.render('error');
  else
    res.json({code: 500, error: err });
});

module.exports = app;

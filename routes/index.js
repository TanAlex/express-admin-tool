var express = require('express');
var router = express.Router();
var apiRouter = require('./api/api');
var BasicSettings= require('../modules/BasicSettings');

//router.use(BasicSettings());

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.user || "not logged in";
  res.render('index', { title: 'Express', username: username });
});

/* login page */
router.get('/login', BasicSettings(), function(req, res, next) {
  //console.log("req.settings:", req.settings);
  //if there is a backUrl, after success login, we rediret back
  //If not set, redirect back to /
  req.settings.backUrl = req.params.backUrl || req.settings.baseUrl + "/";
  res.render('login', { title: 'Welcome to home', req: req.settings });
});

/* all API goes to */
router.use('/api', apiRouter);

module.exports = router;

var express = require('express');
var router = express.Router();
var apiRouter = require('./api/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Welcome to home' });
});

/* all API goes to */
router.use('/api', apiRouter);

module.exports = router;

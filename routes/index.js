var express = require('express');
var router = express.Router();
var apiRouter = require('./api/api');
var BasicSettings = require('../modules/BasicSettings');
var Users = require('../models/Users');

//router.use(BasicSettings());

/* GET home page. */
router.get('/', function (req, res, next) {
  var username = req.session.user || "not logged in";
  res.render('index', { title: 'Express', username: username });
});

/* login page */
router.get('/login', BasicSettings(), async function (req, res, next) {
  //console.log("req.settings:", req.settings);
  //if there is a backUrl, after success login, we rediret back
  //If not set, redirect back to /
  req.settings.backUrl = req.params.backUrl || req.settings.baseUrl + "/";
  var context = undefined;
  if (req.query.action) {
    context = {};
    context.action = req.query.action;
    context.code = req.query.actCode;
    var result = { OK: false, message: "Unknown action or actCode" };
    try {
      var users = new Users(global.db);
      if (req.query.action == "activate" && req.query.actCode) {
        result = users.decodeResetPasswordCode(req.query.actCode);
        if (result.OK){
          context.actCode = result.actCode;
          context.email =  result.email;
          result =  await users.activateUser(req.query.actCode);
        }
      }else if (req.query.action == "resetpassword" && req.query.actCode){
        result = users.decodeResetPasswordCode(req.query.actCode);
        if (result.OK){
          context.actCode = result.actCode;
          context.email =  result.email;
          result = await users.checkResetPasswordCode(result.email, result.actCode);
        }
      }
    } catch (error) {
      result = { OK: false, message: error.message };
    }
    context.result = result;
  }
  req.settings.context = context;
  res.render('login', { title: 'Welcome to home', req: req.settings });
});



/* all API goes to */
router.use('/api', apiRouter);

module.exports = router;

var express = require('express');
var Users = require('../../models/users');
var router = express.Router();
var crypto= require('../../libs/Crypto');

/* All API required JSON content-type */
router.use(function (req, res, next) {
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    return res.send(400);
  next();
});

/* GET /api/login API. */
router.get('/login', function (req, res, next) {
  res.json({ result: "OK" });
});

/* POST /api/login API. */
router.post('/login', function (req, res, next) {
  if (typeof req.body.username != "string" || typeof req.body.password != "string") {
    res.status(400).json({ error: "need to post both username and password" });
    res.end();
  } else {
    try {
      var users = new Users(global.db);
      users.getUserByEmail(req.body.username).then(function (user) {
        if (user ) {
          //console.log(user);
          if (! user.activated){
            res.status(200).json({ result: false, message: "user hasn't been activated, check your welcome email" });
          }else if(user.disabled){
            res.status(200).json({ result: false, message: "user is locked or disabled, please contact administrator to unlonk" });
          }else{
            var validPassword = crypto.validatePassword(req.body.password, user.password, user.salt); 
            if (validPassword){ 
              req.session.user = { username: user.username, user_id: user.user_id, email: user.email };
              res.status(200).json({ result: true, message: "login success" });
            }else{
              res.status(200).json({ result: false, message: "login fail" });
            }
          }
        } else {
          res.status(200).json({ result: false, message: "login fail" });
        }
      });
    } catch (err) {
      res.status(400);
      res.json({ result: false, error: err });
    }
  }
});

/* POST /api/register API. */
router.post('/register', function (req, res, next) {
  if (typeof req.body.email != "string" || typeof req.body.password != "string") {
    res.status(400).json({ error: "need to post both email and password" });
    res.end();
  } else {
    try {
      var users = new Users(global.db);
      users.getUserByEmail(req.body.email).then(function (user) {
        if (user ) {
          res.status(200).json({ result: false, message: "user already registered, use Forgot Password to retrieve password" });
        }else{
          //console.log(user);
          users.registerUser(req.body.email, req.body.password).then( (result) => {
            console.log("res:", result);
            console.log("affectedRows:", result.results.affectedRows);
            if (result && result.results && result.results.affectedRows >=1 ) {
              res.status(200).json({ result: true, message: "Successfully registered, check inbox for activation links then try to login" });
              res.end();
            }
          }).catch(function(error){
            console.log(error);
          });
        } 
      });
    } catch (err) {
      res.status(400);
      res.json({ result: false, error: err });
    }
  }
});


router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({ message: "/api services error", error: err });
})

module.exports = router;

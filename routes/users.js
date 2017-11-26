var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', async function (req, res, next) {
  if (req.session.viewsCount) {
    req.session.viewsCount++;
  } else {
    req.session.viewsCount = 1
  }
  //res.send('respond with a resource');
  req.app.locals.users = [{ name: "test01" }, { name: "test21" }];
  //var configs = req.app.get('configs');
  var configs = global.configs;
  req.app.locals.config = configs.dbConfig;
  configs.dbConfig.connectionLimit++;
  
  var db = global.db;

  // db.query("SELECT * FROM sessions", function(error,  results, fields){
  //   if (!error){
  //     console.log("results:", results);
  //     console.log("fields:", fields);
  //   }
  // });

  var results = await db.queryAsync("SELECT * FROM sessions");
  console.log("results:", results);

  var redis = global.redis;

  // redis.set("viewCount", configs.dbConfig.connectionLimit + 1, function(){
  //   redis.get('viewCount', function(error, val){

  //     res.render('users', { title: 'Express', viewsCount: req.session.viewsCount, redisCount: val, layout: false });
  //   });    
  // } );
  // redis.setAsync("viewCount", configs.dbConfig.connectionLimit + 1).then(
  //   redis.getAsync("viewCount").then(function(val){
  //     res.render('users', { title: 'Express', viewsCount: req.session.viewsCount, redisCount: val, layout: false });
  //   })
  // );
  var result = await redis.setAsync("viewCount", configs.dbConfig.connectionLimit + 1);
  var val = await redis.getAsync("viewCount");
  res.render('users', { title: 'Express', viewsCount: req.session.viewsCount, redisCount: val, layout: false });
  
});

module.exports = router;

var DB= require('../libs/DB');
var crypto= require('../libs/Crypto');
var configs  = require('../configs/configs.js');

db = new DB(configs.dbConfig);

db.query("SELECT * FROM sec_users", function(error,  results, fields){
  if (!error){
    //console.log("results:", results);
    //console.log("fields:", fields);
    var password = "hello world";
    var result = results[0];
    var res1 = crypto.validatePassword(password,result.password,result.salt);
    console.log(res1);
  }else{
    console.log(error);
  }
});
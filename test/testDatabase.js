var DB = require('../libs/DB');
var crypto = require('../libs/Crypto');
var configs = require('../configs/configs.js');
var Users = require('../models/Users');

db = new DB(configs.dbConfig);

// db.query("SELECT * FROM sec_users", function(error,  results, fields){
//   if (!error){
//     console.log("results:", results);
//     console.log("fields:", fields);
//     var password = "hello world";
//     var result = results[0];
//     var res1 = crypto.validatePassword(password,result.password,result.salt);
//     console.log(res1);
//   }else{
//     console.log(error);
//   }
// });

// db.getOne("SELECT * FROM sec_users").then(function (user) {
//   console.log(user);
// }).catch(function (error) {
//   console.log(error);
// })

// db.getAll("SELECT * FROM sec_roles").then(function (roles) {
//   console.log(roles);
//   roles.forEach((r) => console.log(r.name, r.description));
// }).catch(function (error) {
//   console.log(error);
//   console.log("not bad at all");
// })


// db.getOne("SELECT * FROM sec_users WHERE user_id = ?", [1]).then(function (user) {
//   console.log(user);
// }).catch(function (error) {
//   console.log(error);
// })

// var users = new Users(db);
// users.getUserById(1, function (error, user) {
//   console.log('user:', user);
//   console.log("fun");
// })

// var users = new Users(db);
// try {
//   users.getUserById(2).then(function (user) {
//     console.log('user:', user);
//   }).catch(function (err) { console.log("promise-catch:", err) });

//   users.getUserByEmail('ttan').then(function (user) {
//     console.log('user:', user);
//   });
// } catch (error) {
//   console.log("try-catch:", error);
// }

db.each("SELECT * FROM sec_users", function (user) {
  console.log(user);
}).catch(function (error) {
  console.log(error);
})
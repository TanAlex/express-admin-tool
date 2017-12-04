/**
 * ADO for users and roles
 * @function User
 * @param {lib/DB} db - DB instance.
 * @return {User} user - User instance
 */
var DB = require('../libs/DB');
var crypto = require('../libs/Crypto');
var configs = require('../configs/configs.js');

function Users(db) {
  this.db = db;
}



// Users.prototype.getUserById = function (id, cb) {
//   this.db = this.db || new DB(configs.dbConfig);
//   this.db.query("SELECT * FROM sec_users WHERE user_id = ?", [id], function (error, results, fields) {
//     if (!error) {
//       //console.log("results:", results);
//       //console.log("fields:", fields);
//       var user = undefined;
//       if (results && results[0]){
//         var user = results[0];      
//         //console.log("user:", user);
//       }
//       cb(error, user);
//     } else {
//       //console.log(error);
//       cb(error);
//     }
//   });
// }

Users.prototype.getUserById = function (id) {
  //this.db = this.db || new DB(configs.dbConfig);
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  return this.db.getOne("SELECT * FROM sec_users WHERE user_id = ?", [id]);
}




Users.prototype.getAllUsers = function () {
  //this.db = this.db || new DB(configs.dbConfig);
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  return this.db.getAll("SELECT * FROM sec_users");
}


Users.prototype.getUserByEmail = function (email) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  return this.db.getOne("SELECT * FROM sec_users WHERE email = ?", [email]);
}

Users.prototype.registerUser = async function (email, password) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  var self = this;
  var user = await self.getUserByEmail(email);
  if (user) {
    return { OK: false, message: "user already exist" };
  } else {
    var actcode = crypto.genRandomString(16);
    var { salt, hash } = crypto.saltHashPassword(password);
    var dbRes = await self.db.queryAsync(`INSERT INTO sec_users (username, password, salt, phone, email, roles, actcode, disabled, activated, register_date) 
    VALUES    ("",?, ?, "", ?, "['user']", ?, 0, 0, now())`, [hash, salt, email, actcode]);
    // dbRes:
    // { results:
    //    OkPacket {
    //      fieldCount: 0,
    //      affectedRows: 1,
    //      insertId: 5,
    //      serverStatus: 2,
    //      warningCount: 0,
    //      message: '',
    //      protocol41: true,
    //      changedRows: 0 },    
    if (dbRes.results.affectedRows >= 1) {
      //successfully inserted

      return { OK: true, results: dbRes.results };
    } else {
      return { OK: false, message: "Failed to insert to user" };;
    }
  }
}

/**
 * activateUser - 
 * @function activateUser
 * @param {string} actCode - the activate code in email.
 * @return {result} { OK: true/false, message: "reason" } 
 */
Users.prototype.activateUser = async function (actCode) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  var self = this;
  var user = await self.db.getOne("SELECT * FROM sec_users WHERE actcode = ?", [actCode]);
  if (!user) {
    return { OK: false, message: "no user has this actcode" };
  } else {
    if (user.activated) {
      return { OK: true, message: "user already activated" };
    } else {
      var dbRes = await self.db.queryAsync(`UPDATE sec_users SET activated = 1 WHERE actcode = ?`, [actCode]);
      if (dbRes.results.affectedRows >= 1) {
        //successfully inserted      
        return { OK: true, results: dbRes.results };
      } else {
        return { OK: false, message: "Failed to update user" };;
      }
    }
  }
}


/**
 * resetUserPassword - 
 * @function resetUserPassword
 * @param {string} email - the email for user acount. 
 * @param {string} password - the new password.
 * @param {string} actCode - the activate code in email.
 * @return {result} { OK: true/false, message: "reason" } 
 */
Users.prototype.resetUserPassword = async function (email, password, actCode) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  var self = this;
  var user = await self.db.getOne("SELECT * FROM sec_users WHERE actcode = ? and email = ?", [actCode, email]);
  if (!user) {
    return { OK: false, message: "no user has this actcode" };
  } else {
    var { salt, hash } = crypto.saltHashPassword(password);

    var dbRes = await self.db.queryAsync(`UPDATE sec_users SET activated = 1, password= ?, salt = ? WHERE actcode = ? and email = ?`,
      [hash, salt, actCode, email]);
    if (dbRes.results.affectedRows >= 1) {
      //successfully inserted      
      return { OK: true, message: "sucessfully updated new password", results: dbRes.results };
    } else {
      return { OK: false, message: "Failed to update user" };;
    }

  }
}

/**
 * check if the actCode is valid for that user account with that email 
 * @function checkResetPasswordCode
 * @param {string} email - the email for user acount. 
 * @param {string} actCode - the activate code in email.
 * @return {result} { OK: true/false, message: "reason" } 
 */
Users.prototype.checkResetPasswordCode = async function (email, actCode) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  var self = this;
  var user = await self.db.getOne("SELECT * FROM sec_users WHERE actcode = ? and email = ?", [actCode, email]);
  if (!user) {
    return { OK: false, message: "no user has this actcode" };
  } else {

    return { OK: true, message: "successful" };
  }
}

Users.prototype.generateResetPasswordCode = async function (email) {
  if (!(this.db instanceof DB)) throw new Error("Need to assign instance variable db before calling");
  var self = this;
  var user = await self.db.getOne("SELECT * FROM sec_users WHERE email = ?", [email]);
  if (!user) {
    return { OK: false, message: "no user has this email" };
  } else {
    var actCode = crypto.genRandomString(16);
    var finalCode = actCode + new Buffer(email).toString('base64');
    var dbRes = await self.db.queryAsync(`UPDATE sec_users SET actcode = ? WHERE email = ?`, [actCode, email]);
    if (dbRes.results.affectedRows >= 1) {
      return { OK: true, actCode: finalCode };
    }else{
      return { OK: false, message: "can't update actcode" };
    }
  }
}

Users.prototype.decodeResetPasswordCode = async function (code) {
  var actCode = code.substring(0, 16);
  var email = code.substring(16);
  if (!actCode || !email) {
    return { OK: false, message: "invalid actCode" };
  } else {
    email = new Buffer(email, 'base64').toString('ascii');
    return { OK: true, actCode: actCode, email: email };
  }
}

module.exports = exports = Users;
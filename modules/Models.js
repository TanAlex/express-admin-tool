'use strict';
/**
 * Middleware function that reads all models from models directory
 * and build a Model object using all the models
 * For example: if you have users.js and accounts.js in models directory
 * it will build 
 *     Models.users = new Users(db)
 *     Models.accounts = new Accounts(db)
 * then return Model object
 * @function Models
 * @return Model with properties for each models
 */


function Models(db) {
  var fs =  require("fs");
  var Path = require("path");
  var normalizedPath = Path.join(__dirname, "../models");
  var Model = {};
  fs.readdirSync(normalizedPath).forEach(function(file) {
    //skip files with _ in the first character, like _base etc.
    if (! file.match(/^_/)){
      
      var modelName = file.split(".")[0];
      var func = require("../models/" + file);
      Model[modelName] = Model[modelName] || new func(db);
    }
  });
  return Model;
}


module.exports = Models;
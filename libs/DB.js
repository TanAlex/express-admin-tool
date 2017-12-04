var mysql = require('mysql');

//exported functions
function MySql(options) {
  this.pool = mysql.createPool(options);
}

//simple wrapper of mysqljs
MySql.prototype.query = function () {
  var argLength = arguments.length;
  if (argLength < 1) throw new TypeError("have to have query string");
  var callback = arguments[argLength-1];
  var newArgs = [];
  if (typeof callback == "function") {
    newArgs = Array.prototype.slice.call(arguments,0, argLength-1);
  }else{
    return connection.query.apply(connection, arguments);
  }
  this.pool.getConnection(function(err, connection) {
    if (err) throw new Error("Can't get db connections");
    //Add out call back so it call to mysqljs so we can handle result before we call original callback func
    newArgs.push(function (error, results, fields) {
      // And done with the connection.
      connection.release();  
      if (typeof callback == "function"){
        // Handle error after the release.
        if (error) callback(error);  
        // Don't use the connection here, it has been returned to the pool.
        else callback(error,  results, fields);
      }
    });
    // Use the connection
    connection.query.apply(connection, newArgs);
  });

}

//This is a async version
//So you can easily use it like:
//var res = await db.queryAsync("select * from SomeTable");
//    res.results and res.fileds will be populated with values after the call
MySql.prototype.queryAsync = function () {
  var newArgs = Array.prototype.slice.call(arguments,0);
  var self = this;
  var promise = new Promise( (resolve, reject) => {
    var ret = {};
    newArgs.push(function(error, results, fields){
      if (error) reject(error);
      ret.results = results;
      ret.fields = fields;
      resolve(ret);
    })
    self.query.apply(self, newArgs);
  });
  return promise;
}

/**
 * Wrapper to query LIMIT 1 and return the one if found or undefined if not found
 * @function getOne
 * @param  same as mysqljs.
 * @return promise for return - first row in results
 */
MySql.prototype.getOne = function(){
  var self = this;
  var newArgs = Array.prototype.slice.call(arguments,0);
  var promise = new Promise( (resolve, reject) => {
    var ret = undefined;
    newArgs.push(function(error, results, fields){
      if (error) reject(error);
      if (results && results[0]){
        ret = results[0];        
      }
      //when nothing found, return undefined
      resolve(ret);
    })
    self.query.apply(self, newArgs);
  });
  return promise;
}

/**
 * Wrapper to query db and return the rows if found or undefined if not found
 * @function getAll
 * @param  same as mysqljs.
 * @return promise for return - rows in results
 */
MySql.prototype.getAll = function(){
  var self = this;
  var newArgs = Array.prototype.slice.call(arguments,0);
  var promise = new Promise( (resolve, reject) => {
    var ret = undefined;
    newArgs.push(function(error, results, fields){
      if (error) reject(error);
      if (results && results[0]){
        ret = results;        
      }
      //when nothing found, return undefined
      resolve(ret);
    })
    self.query.apply(self, newArgs);
  });
  return promise;
}


module.exports = MySql;
'use strict';
/**
 * Middleware factory to add basic settings to req so following functions can use
 * settings are like url and baseUrl
 * @function BasicSettings
 * @return middleware function (req, res, next)
 */
module.exports = function () {
  return function (req, res, next) {
    var port = req.app.settings.port;
    req.settings = {};
    req.settings.url = req.protocol + '://' + req.hostname + (port ? ':' + port : port) + req.path;
    req.settings.baseUrl = req.protocol + '://' + req.hostname + (port ? ':' + port : port) + global.configs.baseAppPath;
    console.log("baseUrl:", req.settings.baseUrl);
    next();
  }
};

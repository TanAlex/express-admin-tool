'use strict';
/**
 * Middleware factory to return back middleware functins to validate session or token status
 * mainly to check if user has valid logged-in session or use valide token
 * 
 *
 * @return middleware function (req, res, next)
 */
var Auth = {
  // validateSession middleware, it will check if the session is logged in and valid, 
  // otherwise goes to login page
  validateSession: function (redirectUrl) {
    redirectUrl = redirectUrl || "/login";
    return function (req, res, next) {
      if (req.session && req.session.user) {
        next();
      } else {
        // no valid session or not logged in
        // redirect to the "redirectUrl"

        //req.settings = {};
        //var port = req.app.settings.port;
        //req.settings.url = req.protocol + '://' + req.hostname + (port ? ':' + port : port) + req.path;
        //req.settings.baseUrl = req.protocol + '://' + req.hostname + (port ? ':' + port : port) + global.configs.baseAppPath;
        var url = global.configs.baseAppPath + redirectUrl + "?backUrl="+ encodeURIComponent(req.path);

        console.log("Auth.validateSession redirectUrl:", url);
        res.redirect(url);
        res.end();
      }
    }
  },
  validateToken: function () {
    return function (req, res, next) {
      console.log("validateToken: not implemented");
      next();
    }
  }
}
module.exports = Auth;
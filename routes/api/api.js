var express = require('express');
var router = express.Router();

/* All API required JSON content-type */
router.use(function(req, res, next) {
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0)
    return res.send(400);
  next();
});

/* GET /api/login API. */
router.get('/login', function(req, res, next) {
  res.json({result: "OK"});
});

/* POST /api/login API. */
router.post('/login', function(req, res, next) {
  res.json({params: req.params, body: req.body});
});

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({message:"/api services error", error: err});
})

module.exports = router;

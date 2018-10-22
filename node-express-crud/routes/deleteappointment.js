var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/deleteappointment/:uid', function(req, res, next) {
	console.log(req.params.uid);
  res.send('respond with a resource');
});

module.exports = router;

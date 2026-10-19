var express = require('express');
var router = express.Router();
var ctrlTraveler = require('../controllers/traveler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET travel page
router.get('/travel', ctrlTraveler.travel);

module.exports = router;

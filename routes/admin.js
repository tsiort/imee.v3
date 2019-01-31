var express = require('express');
var router = express.Router();

const authenticationMiddleware = require("../middleware/authMiddleware");

// -----------------------------------------------------------------------------
// Ensure authentication before accessing admin routes
// -----------------------------------------------------------------------------
router.get('*', authenticationMiddleware(), function(req, res, next) {
  next();
});


router.get('/', function(req, res, next) {
  res.render('admin/index', {
    layout: 'admin',
    title: 'Dashboard',
    active: 'none',
  });
});

module.exports = router;

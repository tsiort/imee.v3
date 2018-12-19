var express = require('express');
var router = express.Router();

var Experience = require('../models/experience.js')
var ExperienceCat = require('../models/experience-cat.js')
var Program = require('../models/program.js');
var Meganav = require('../models/meganav.js');

// Global arrays
let experience_categories = [];
let experience = [];

let nav = [];
let prg = [];

router.get('*', function(req, res, next) {
  // console.log('got it');
  Meganav.get(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    nav = result[0];
    if( nav.meganav_featured ){
      Program.get(nav.meganav_featured, function(err, result) {
        if (err) {
          res.json(err);
          return;
        }
        prg = result[0];
        next();
      });
    } else {
      prog = null;
      next();
    }

  });

});


router.get(/empiria/, function(req, res, next) {
  ExperienceCat.getAll(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }

    experience_categories = result;

    Experience.getAll(function(err, result) {
      if (err) {
        res.json(err);
        return;
      }

      result.forEach(function(item) {
        item.categories = JSON.parse(item.categories);
      });

      experience = result;
      next();
    });
  });
});

router.get('/', function(req, res, next) {
  res.render('foreas/istoriko', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});

router.get('/synerg', function(req, res, next) {
  res.render('foreas/synerg', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});
router.get('/ipodomi', function(req, res, next) {
  res.render('foreas/ipodomi', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});
router.get('/drast', function(req, res, next) {
  res.render('foreas/drast', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});
router.get('/org', function(req, res, next) {
  res.render('foreas/org', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});
router.get('/ekdilo', function(req, res, next) {
  res.render('foreas/ekdilo', {
    title: 'Ο Φορέας',
    nav: nav,
    prg: prg,
  });
});
router.get('/empiria', function(req, res, next) {




  res.render('foreas/empiria', {
    title: 'Ο Φορέας',
    categories: experience_categories,
    experience: experience,
    active: "all",
    nav: nav,
    prg: prg,
  });
});


router.get('/empiria/cat/:id', function(req, res, next) {

  var cat = [];
  var exp = [];

  var catId = req.params.id;

  ExperienceCat.getAll(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }

    cat = result;

    Experience.getWithCategory( catId, function(err, result) {
      if (err) {
        res.json(err);
        return;
      }

      result.forEach(function(item) {
        item.categories = JSON.parse(item.categories);
      });
      exp = result;

      res.render('foreas/empiria', {
        title: 'Ο Φορέας',
        categories: cat,
        experience: exp,
        active: catId,
        nav: nav,
        prg: prg,
      });
    });
  });

});


router.get('/empiria/article/:expid/:catid', function(req, res, next) {

  var cat = [];
  var exp = [];

  var catId = req.params.catid;
  var expId = req.params.expid;

  ExperienceCat.getAll(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }

    cat = result;

    Experience.get(expId, function(err, result) {
      if (err) {
        res.json(err);
        return;
      }

      result.forEach(function(item) {
        item.categories = JSON.parse(item.categories);
      });
      exp = result[0];

      res.render('foreas/empiria-art', {
        title: 'Ο Φορέας',
        categories: cat,
        experience: exp,
        active: catId,
        nav: nav,
        prg: prg,
        backlink: req.originalUrl,
      });
    });
  });

});



module.exports = router;

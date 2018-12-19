const express = require('express');
const router = express.Router();

const asyncWrapper = require("../middleware/asyncMiddleware");

// -----------------------------------------------------------------------------
// File system includes and promisification
// -----------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
const {
  promisify
} = require("util");
const readdir = promisify(fs.readdir);


// -----------------------------------------------------------------------------
// Model includes
// -----------------------------------------------------------------------------
const models = require("../models");
const Category = models.category;
const ProgramType = models.programType;
const Program = models.program;
const Slider = models.slider;

// -----------------------------------------------------------------------------
// Data Arrays
// -----------------------------------------------------------------------------
let documents = [];
let images = [];
let categories = [];
let programTypes = [];
let programs = [];
let sliders = [];

let data;

// -----------------------------------------------------------------------------
// Data retrieval executed before main routing
// -----------------------------------------------------------------------------
router.get('*', asyncWrapper(async (req, res, next) => {

  categories = await Category.findAll({
    where: {
      status: 'active'
    }
  });
  programTypes = await ProgramType.findAll({
    where: {
      status: 'active'
    }
  });
  programs = await Program.findAll({
    where: {
      status: 'active'
    }
  });
  sliders = await Slider.findAll({
    where: {
      status: 'active'
    }
  });

  let result;
  // Get documents
  result = await readdir('./public/files/uploads/docs');
  result.forEach(function(item) {
    var file = {};
    file.name = item;
    file.ext = path.extname(item).substring(1).toLowerCase();
    file.type = 'doc';
    documents.push(file);
  });
  // Get Images
  result = await readdir('./public/files/uploads/images');
  result.forEach(function(item) {
    var file = {};
    file.name = item;
    file.ext = path.extname(item).substring(1).toLowerCase();
    file.type = 'img';
    images.push(file);
  });


  next();
}));


// -----------------------------------------------------------------------------
// GET /admin/settings/slider
// -----------------------------------------------------------------------------
router.get('/slider', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes,
    programs: programs,
    sliders: sliders
  }

  res.render('admin/slider', {
    layout: 'admin',
    title: 'Ρυθμίσεις',
    type: 'slider',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// GET /admin/settings/slider/new
// -----------------------------------------------------------------------------
router.get('/slider/new', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes,
    programs: programs,
    sliders: sliders
  }

  res.render('admin/create', {
    layout: 'admin',
    title: 'Νέο Slider',
    type: 'slider',
    data: data
  });

}));



// Global arrays
// let experience_categories = [];
// let experience = [];

// router.get(/exp/, function(req, res, next) {
//   ExperienceCat.getAll(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     experience_categories = result;
//
//     Experience.getAll(function(err, result) {
//       if (err) {
//         res.json(err);
//         return;
//       }
//
//       result.forEach(function(item) {
//         item.categories = JSON.parse(item.categories);
//       });
//
//       experience = result;
//       next();
//     });
//   });
// });






/* Slider POST */
router.post('/slider', authenticationMiddleware(), function(req, res, next) {
  var img1 = req.body.sliderimg1 || null;
  var title1 = req.body.slidertitle1 || null;
  var text1 = req.body.slidertext1 || null;
  var prog1 = req.body.sliderprog1 || null;
  var img2 = req.body.sliderimg2 || null;
  var title2 = req.body.slidertitle2 || null;
  var text2 = req.body.slidertext2 || null;
  var prog2 = req.body.sliderprog2 || null;
  var img3 = req.body.sliderimg3 || null;
  var title3 = req.body.slidertitle3 || null;
  var text3 = req.body.slidertext3 || null;
  var prog3 = req.body.sliderprog3 || null;

  Slider.get(function(err, slider) {
    if (err) {
      res.json(err);
      return;
    }

    if (!slider[0]) {

      Slider.insert(img1, title1, text1, prog1, img2, title2, text2, prog2, img3, title3, text3, prog3, function(err, slider) {
        if (err) {
          res.json(err);
          return;
        }
        req.flash('success_msg', 'Η ενημέρωση ηταν επιτυχής');
        res.redirect(req.originalUrl);
        return;
      });
    } else {

      Slider.update(img1, title1, text1, prog1, img2, title2, text2, prog2, img3, title3, text3, prog3, function(err, slider) {
        if (err) {
          res.json(err);
          return;
        }
        req.flash('success_msg', 'Η ενημέρωση ηταν επιτυχής');
        res.redirect(req.originalUrl);
        return;
      });



    }



  });
});


/* Meganav GET */
router.get('/meganav', authenticationMiddleware(), function(req, res, next) {

  var programs = [];
  var meganav = [];

  Program.getAll(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    programs = result;

    Meganav.get(function(err, result) {
      if (err) {
        res.json(err);
        return;
      }
      meganav = result[0];

      res.render('admin/meganav', {
        layout: 'admin',
        title: 'Ρυθμίσεις',
        type: 'meganav',
        // images: images,
        programs: programs,
        meganav: meganav
      });
    });
  });

});


/* Meganav POST */
router.post('/meganav', authenticationMiddleware(), function(req, res, next) {
  var t1 = req.body.meganav_title_1 || null;
  var t11 = req.body.meganav_title_1_1 || null;
  var t12 = req.body.meganav_title_1_2 || null;
  var t13 = req.body.meganav_title_1_3 || null;
  var t11p = req.body.meganav_title_1_1_prog || null;
  var t12p = req.body.meganav_title_1_2_prog || null;
  var t13p = req.body.meganav_title_1_3_prog || null;
  var t2 = req.body.meganav_title_2 || null;
  var t21 = req.body.meganav_title_2_1 || null;
  var t22 = req.body.meganav_title_2_2 || null;
  var t23 = req.body.meganav_title_2_3 || null;
  var t21p = req.body.meganav_title_2_1_prog || null;
  var t22p = req.body.meganav_title_2_2_prog || null;
  var t23p = req.body.meganav_title_2_3_prog || null;
  var tf = req.body.meganav_featured || null;

  Meganav.get(function(err, meganav) {
    if (err) {
      res.json(err);
      return;
    }

    if (!meganav[0]) {

      Meganav.insert(t1, t11, t12, t13, t11p, t12p, t13p, t2, t21, t22, t23, t21p, t22p, t23p, tf, function(err, meganav) {
        if (err) {
          res.json(err);
          return;
        }
        req.flash('success_msg', 'Η ενημέρωση ηταν επιτυχής');
        res.redirect(req.originalUrl);
        return;
      });
    } else {

      Meganav.update(t1, t11, t12, t13, t11p, t12p, t13p, t2, t21, t22, t23, t21p, t22p, t23p, tf, function(err, meganav) {
        if (err) {
          res.json(err);
          return;
        }
        req.flash('success_msg', 'Η ενημέρωση ηταν επιτυχής');
        res.redirect(req.originalUrl);
        return;
      });

    }

  });
});




/* Experience & Categories list GET */
router.get('/exp', authenticationMiddleware(), function(req, res, next) {
  res.render('admin/experience', {
    layout: 'admin',
    title: 'Εμπειρία του φορές',
    type: 'exp',
    categories: experience_categories,
    experience: experience
  });
});

/* Experience Categories New  GET */
router.get('/exp-cat', authenticationMiddleware(), function(req, res, next) {
  res.render('admin/create', {
    layout: 'admin',
    title: 'Νεα Κατηγορία',
    type: 'exp-cat',
  });
});
/* Experience Categories New  POST */
router.post('/exp-cat', authenticationMiddleware(), function(req, res, next) {

  var name = req.body.categoryName;

  ExperienceCat.new(name, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      req.flash('success_msg', 'Η Κατηγορία ' + name + ' δημιουργήθηκε με επιτυχία')
      res.redirect('/admin/settings/exp');
    }
  });
});

/* Delete Category GET */
router.get('/exp-cat/:id/delete', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  ExperienceCat.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/delete', {
      layout: 'admin',
      title: 'Διαγραφή Κατηγορίας',
      type: 'exp-cat',
      result: result[0]
    });
  });
});
/* Delete Category POST */
router.post('/exp-cat/:id/delete', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  ExperienceCat.delete(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    req.flash('success_msg', 'Η Κατηγορία διαγράφτηκε με επιτυχία')
    res.redirect('/admin/settings/exp');

  });
});
/* Edit Category GET */
router.get('/exp-cat/:id/edit', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  ExperienceCat.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/edit', {
      layout: 'admin',
      title: 'Επεξεργασία Κατηγορίας',
      type: 'exp-cat',
      result: result[0]
    });

  });
});
/* Edit Category POST */
router.post('/exp-cat/:id/edit', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  var name = req.body.categoryName;

  req.checkBody('categoryName', 'Το Όνομα της κατηγορίας είναι υποχρεωτικό').notEmpty();

  var errors = req.validationErrors();
  console.log(id);
  console.log(name);
  if (errors) {
    req.flash('errors', errors);
    res.redirect(req.originalUrl);
    return;
  }

  ExperienceCat.update(id, name, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      req.flash('success_msg', 'Η Κατηγορία μετονομάστηκε σε ' + name + ' με επιτυχία')
      res.redirect('/admin/settings/exp');
    }
  });
});


// EXPRERIENCES
/* Experience  New  GET */
router.get('/exp-file', authenticationMiddleware(), function(req, res, next) {
  res.render('admin/create', {
    layout: 'admin-wysiwyg',
    title: 'Νεο Αρχείο',
    type: 'exp-file',
    categories: experience_categories
  });
});
/* Experience Categories New  POST */
router.post('/exp-file', authenticationMiddleware(), function(req, res, next) {

  var name = req.body.expName;
  var categories = req.body.expCat;
  var text = req.body.expText;

  Experience.new(categories, name, text, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      req.flash('success_msg', 'Το αρχείο ' + name + ' δημιουργήθηκε με επιτυχία')
      res.redirect('/admin/settings/exp');
    }
  });
});

/* Delete Category GET */
router.get('/exp-file/:id/delete', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  Experience.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/delete', {
      layout: 'admin',
      title: 'Διαγραφή Αρχείου',
      type: 'exp-file',
      result: result[0]
    });
  });
});
/* Delete Category POST */
router.post('/exp-file/:id/delete', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  Experience.delete(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    req.flash('success_msg', 'Το αρχείο διαγράφτηκε με επιτυχία')
    res.redirect('/admin/settings/exp');

  });
});
/* Edit Category GET */
router.get('/exp-file/:id/edit', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  Experience.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }

    // result.forEach(function(item) {
    //   item.categories = JSON.parse(item.categories);
    // });

    res.render('admin/edit', {
      layout: 'admin-wysiwyg',
      title: 'Επεξεργασία Αρχείου',
      type: 'exp-file',
      result: result[0],
      categories: experience_categories
    });

  });
});
/* Edit Category POST */
router.post('/exp-file/:id/edit', authenticationMiddleware(), function(req, res, next) {
  var id = req.params.id;
  var name = req.body.expName;
  var categories = req.body.expCat;
  var text = req.body.expText;

  // req.checkBody('categoryName', 'Το Όνομα της κατηγορίας είναι υποχρεωτικό').notEmpty();

  var errors = req.validationErrors();;
  if (errors) {
    req.flash('errors', errors);
    res.redirect(req.originalUrl);
    return;
  }

  Experience.update(id, categories, name, text, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      req.flash('success_msg', 'Το αρχείο άλλαξε με επιτυχία')
      res.redirect('/admin/settings/exp');
    }
  });
});









// Authentication based restriction middleware
function authenticationMiddleware() {
  return (req, res, next) => {
    // if (req.isAuthenticated()) return next();
    // res.redirect('/login');
    return next();
  }
}

module.exports = router;

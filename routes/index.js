var express = require('express');
var router = express.Router();

var passport = require('passport');

const asyncWrapper = require("../middleware/asyncMiddleware");


let models = require("../models");

let Category = models.category;
let Program = models.program;
let Seminar = models.seminar;
let Slider = models.slider;



let categories = [];
let sliders = [];
let seminars = [];
let programs = [];
let programNav = [];
let seminarNav = [];

let data;




router.get('*', async function(req, res, next) {

  categories = await Category.findAll({
    where: {
      status: 'active'
    }
  });
  sliders = await Slider.findAll({
    where: {
      status: 'active'
    }
  });
  programNav = await Program.findAll({
    where: {
      status: 'active',
      easyAccess: 1
    },
    include: [{
      model: Category
    }]
  });
  seminarNav = await Seminar.findAll({
    where: {
      status: 'active',
      easyAccess: 1
    }
  });



  next();
})


/* GET home page. */
router.get('/', asyncWrapper(async (req, res, next) => {


  let featuredPrograms = await Program.findAll({
    where: {
      status: 'active',
      featured: 1
    }
  });

  let featuredSeminars = await Seminar.findAll({
    where: {
      status: 'active',
      featured: 1
    }
  });

  data = {
    categories: categories,
    sliders: sliders,
    programNav: programNav,
    seminarNav: seminarNav,
    featuredPrograms: featuredPrograms,
    featuredSeminars: featuredSeminars
  }

  res.render('index', {
    title: 'Αρχική',
    data: data
  });

}));

router.get('/programs', asyncWrapper(async (req, res, next) => {

  programs = await Program.findAll({
    where: {
      status: 'active'
    }
  });


  data = {
    categories: categories,
    programNav: programNav,
    seminarNav: seminarNav,
    programs: programs
  }


  res.render('programs', {
    title: 'Προγράμματα',
    type: 'prog',
    data: data,
    activecat: 'all'
  });

}));


router.get('/programs/category/:id', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;


  programs = await Program.findAll({
    where: {
      status: 'active',
      categoryId: id
    }
  });


  data = {
    categories: categories,
    programNav: programNav,
    seminarNav: seminarNav,
    programs: programs
  }

  res.render('programs', {
    title: 'Προγράμματα',
    type: 'prog',
    data: data,
    activecat: id
  });

}));


router.get('/programs/:id', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  program = await Program.findByPk(id, {
    where: {
      status: 'active',
    }
  });


  data = {
    categories: categories,
    programNav: programNav,
    seminarNav: seminarNav,
    program: program
  }

  res.render('program', {
    title: 'Προγράμματα',
    data: data
  });
}));


// /* GET home page. */
// router.get('/', function(req, res, next) {
//
//   var programs = [],
//     slider = [],
//     news = [],
//     category = [];
//
//   Slider.get(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     slider = result[0];
//     Program.getFeatured(function(err, result) {
//       if (err) {
//         res.json(err);
//         return;
//       }
//       result.forEach(function(item) {
//         item.categories = JSON.parse(item.categories);
//       });
//       programs = result;
//
//       News.getFeatured(function(err, result) {
//         if (err) {
//           res.json(err);
//           return;
//         }
//         news = result;
//
//         Category.getAll(function(err, result) {
//           if (err) {
//             res.json(err);
//             return;
//           }
//           category = result;
//
//           res.render('index', {
//             title: 'Αρχική',
//             slider: slider,
//             featured: programs,
//             news: news,
//             nav: nav,
//             prg: prg,
//             category: category
//           });
//         });
//       });
//     });
//   });
// });
//
// router.get('/programs', function(req, res, next) {
//
//   var category = [],
//     program = [];
//
//   Category.getAll(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     category = result;
//
//     Program.getAll(function(err, result) {
//       if (err) {
//         res.json(err);
//         return;
//       }
//       result.forEach(function(item) {
//         item.categories = JSON.parse(item.categories);
//       });
//       program = result;
//
//       res.render('programs', {
//         title: 'Προγράμματα',
//         type: 'prog',
//         category: category,
//         program: program,
//         nav: nav,
//         prg: prg,
//         activecat: 'all'
//       });
//     });
//   });
// });
//
// router.get('/programs/category/:id', function(req, res, next) {
//   var id = req.params.id;
//   var category = [],
//     program = [];
//
//   Category.getAll(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     category = result;
//
//     Program.getWithCategory(id, function(err, result) {
//       if (err) {
//         res.json(err);
//         return;
//       }
//       result.forEach(function(item) {
//         item.categories = JSON.parse(item.categories);
//       });
//       program = result;
//
//       res.render('programs', {
//         title: 'Προγράμματα',
//         type: 'prog',
//         category: category,
//         program: program,
//         nav: nav,
//         prg: prg,
//         activecat: id
//       });
//     });
//   });
// });
//
// router.get('/programs/:id', function(req, res, next) {
//
//   var id = req.params.id;
//   var program = [];
//
//   Program.get(id, function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     result.forEach(function(item) {
//       item.attachments = JSON.parse(item.attachments);
//       item.categories = JSON.parse(item.categories);
//       item.gallery = JSON.parse(item.gallery);
//     })
//     program = result[0];
//     console.log(program);
//     res.render('program', {
//       title: 'Προγράμματα',
//       program: program,
//       nav: nav,
//       prg: prg,
//     });
//   });
// });
//
//
// router.get('/news', function(req, res, next) {
//
//   var news = []
//
//   News.getAll(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     news = result;
//     res.render('news', {
//       title: 'Ανακοινώσεις',
//       news: news,
//       nav: nav,
//       prg: prg,
//     });
//   });
//
//
// });
//
// router.get('/contact', function(req, res, next) {
//   res.render('contact', {
//     title: 'Επικοινωνία',
//     nav: nav,
//     prg: prg,
//   });
// });
//
//
//
//
// Login GET
router.get('/login', function(req, res, next) {
  res.render('login', {
    layout: 'login',
    title: 'Είσοδος',
    er: res.locals.er
  });
});
//
//
router.post('/login',
  passport.authenticate('local-signin', {
    successRedirect: 'admin',
    failureRedirect: 'login',
    failureFlash: true,
    successFlash: true
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
//
//
// // Passport related functions
// passport.serializeUser(function(userID, done) {
//   done(null, userID);
// });
// passport.deserializeUser(function(userID, done) {
//   done(null, userID);
// });
// // Authentication based restriction middleware
// function authenticationMiddleware() {
//   return (req, res, next) => {
//     console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
//
//     if (req.isAuthenticated()) return next();
//     res.redirect('login');
//   }
// }
//
//
module.exports = router;

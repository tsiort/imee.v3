var express = require('express');
var router = express.Router();

var passport = require('passport');



let models = require("../models");

let Category = models.category;
let ProgramType = models.programType;
let Program = models.program;
let Slider = models.slider;
let MegaNav = models.megaNav;



let programTypes = [];
let categories = [];
let sliders = [];
let nav1 = [];
let nav2 = [];

let data;

router.get('*', function(req, res, next) {

  // ProgramType
  //   .findOrCreate({
  //     where: {
  //       text: 'Επιδοτούμενα'
  //     }
  //   })
  //   .spread((programType, created) => {});
  //
  // ProgramType
  //   .findOrCreate({
  //     where: {
  //       text: 'Σεμινάρια'
  //     }
  //   })
  //   .spread((programType, created) => {});
  //
  //
  // MegaNav.findOrCreate({
  //   where: {
  //     title: 'Επιδοτούμενα',
  //     programTypeId: 1
  //   }
  // }).then(megaNav => {});
  //
  // MegaNav.findOrCreate({
  //   where: {
  //     title: 'Σεμινάρια',
  //     programTypeId: 2
  //   }
  // }).then(megaNav => {});

  // Category.findOrCreate({
  //   where: {
  //     text: 'Για ανέργους',
  //     programTypeId: 1,
  //     megaNavId: 1
  //   }
  // }).then(category => {});
  //
  // Category.findOrCreate({
  //   where: {
  //     text: 'Για ΑΜΕΑ',
  //     programTypeId: 1,
  //     megaNavId: 1
  //   }
  // }).then(category => {});
  //
  // Category.findOrCreate({
  //   where: {
  //     text: 'Για Φοιτητές',
  //     programTypeId: 1,
  //     megaNavId: 1
  //   }
  // }).then(category => {});



  //
  // Slider
  //   .findOrCreate({
  //     where: {
  //       title: 'Είσαι Άνεργος;',
  //       text: 'Συμπλήρωσε τα στοιχεία σου εδώ και εμείς θα επικοινωνήσουμε άμεσα μαζί σου για να σε ενημερώσουμε για τις νέες δράσεις κατάρτησης που σε αφορούν',
  //       image: 'under-const.jpg'
  //     }
  //   })
  //   .spread((slider, created) => {});






  // Slider
  //   .findOrCreate({
  //     where: {
  //       title: 'Τίτλος 2 ',
  //       text: 'Κείμενο 2',
  //       image: 'safety_first_aid.jpeg'
  //     }
  //   })
  //   .spread((slider, created) => {});
  //
  // Slider
  //   .findOrCreate({
  //     where: {
  //       title: 'Τίτλος 3 ',
  //       text: 'Κείμενο 3',
  //       image: 'food_chef.jpg'
  //     }
  //   })
  //   .spread((slider, created) => {});

  next();
})



router.get('*', async function(req, res, next) {

  categories = await Category.findAll({
    raw: true,
    where: {
      status: 'active'
    },
    include: [{
      model: ProgramType
    }]

  });
  programTypes = await ProgramType.findAll({
    raw: true,
    where: {
      status: 'active'
    },

  });
  sliders = await Slider.findAll({
    raw: true,
    where: {
      status: 'active'
    },

  });

  nav1 = await MegaNav.findById(1, {
    // raw: true,
    include: [{
        model: Category,
      },
      {
        model: Program,
        include: [{
          model: Category,
        }]
      }
    ],
  });

  nav2 = await MegaNav.findById(2, {
    include: [{
      model: Program
    }]
  });
  // console.log(nav1);
  // console.log(nav2);

  // nav1.categories.forEach((category) => {
  //   console.log(category);
  // })
  console.log(nav1);
  nav1.programs.forEach((program)   => {
    console.log(program.title);
    // console.log(program.categories);

    program.categories.forEach((category) => {
      console.log(`ID: ${category.id}, text: ${category.text}`);
    })
  })

  next();
})

// // var nodemailer = require('nodemailer');
// //
// // var transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   // port: 995,
// //   secure: true,
// //   auth: {
// //     user: 'tsiotrasi@gmail.com',
// //     pass: '111989aaa'
// //   },
// // });
// //
// // var mailOptions = {
// //   from: 'tsiotrasi@gmail.com',
// //   to: 'pertrosmosxolios@gmail.com',
// //   subject: 'Sending Email using Node.js',
// //   text: 'That was easy!'
// // };
// //
// // transporter.sendMail(mailOptions, function(error, info){
// //   if (error) {
// //     console.log(error);
// //   } else {
// //     console.log('Email sent: ' + info.response);
// //   }
// // });
//
//
//
//
//
// // Models
// var User = require('../models/user.js');
// var Category = require('../models/category.js');
// var Program = require('../models/program.js');
// var Slider = require('../models/slider.js');
// var News = require('../models/news.js');
// var Meganav = require('../models/meganav.js');
//
// var nav = [];
// var prg = [];
//
// router.get('*', function(req, res, next) {
//   // console.log('got it');
//   Meganav.get(function(err, result) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     nav = result[0];
//     if( nav.meganav_featured ){
//       Program.get(nav.meganav_featured, function(err, result) {
//         if (err) {
//           res.json(err);
//           return;
//         }
//         prg = result[0];
//         next();
//       });
//     } else {
//       prog = null;
//       next();
//     }
//
//   });
//
// });
//

/* GET home page. */
router.get('/', function(req, res, next) {

  data = {
    catergories: categories,
    programTypes: programTypes,
    sliders: sliders,
    nav1: nav1,
    nav2: nav2
  }

  //
  //
  // data.nav1.categories.forEach(function(item){
  //   console.log(item.dataValues);
  // });

  res.render('index', {
    title: 'Αρχική',
    data: data
    // slider: slider,
    // featured: programs,
    // news: news,
    // nav: nav,
    // prg: prg,
    // category: category
  });

});



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

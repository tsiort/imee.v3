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


// -----------------------------------------------------------------------------
// Data Arrays
// -----------------------------------------------------------------------------
let documents = [];
let images = [];
let categories = [];
let programTypes = [];
let programs = [];

let data;


// -----------------------------------------------------------------------------
// Data retrieval executed before main routing
// -----------------------------------------------------------------------------
router.get('*', asyncWrapper(async (req, res, next) => {

  programs = await Program.findAll({
    where: {
      status: 'active'
    },
    include: [{
      model: Category,
      // as: 'categories',
      // through: 'programCategories'
    }],
    include: [{
      model: ProgramType
    }]
  });
  console.log(programs);

  // programs = await Program.findAll({
  //   where: {
  //     status: 'active'
  //   },
  //   include: [{
  //     model: Category,
  //     as: 'categories',
  //     through: 'programCategories'
  //   }],
  //   include: [{
  //     model: ProgramType
  //   }]
  // });

  categories = await Category.findAll({
    where: {
      status: 'active'
    },
    include: [{
      model: Program
    }],
    include: [{
      model: ProgramType
    }],
  });

  programTypes = await ProgramType.findAll({
    where: {
      status: 'active'
    }
  });


  let result;
  let fileFound;
  // Get documents
  result = await readdir('./public/files/uploads/docs');
  result.forEach(function(item) {
    var file = {};
    file.name = item;
    file.ext = path.extname(item).substring(1).toLowerCase();
    file.type = 'doc';

    fileFound = documents.some(function(el) {
      return el.name === file.name && el.ext === file.ext && el.type === file.type;
    });
    if (!fileFound)
      documents.push(file);
  });
  // Get Images
  result = await readdir('./public/files/uploads/images');
  result.forEach(function(item) {
    var file = {};
    file.name = item;
    file.ext = path.extname(item).substring(1).toLowerCase();
    file.type = 'img';

    fileFound = images.some(function(el) {
      return el.name === file.name && el.ext === file.ext && el.type === file.type;
    });
    if (!fileFound)
      images.push(file);
  });


  next();
}));


// -----------------------------------------------------------------------------
// GET /admin/program
// -----------------------------------------------------------------------------
router.get('/', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes,
    programs: programs
  }


  res.render('admin/program', {
    layout: 'admin',
    title: 'Προγράμματα',
    type: 'prog',
    data: data
  });

}));
// -----------------------------------------------------------------------------
// GET /admin/program/new
// -----------------------------------------------------------------------------
router.get('/new', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes
  }

  res.render('admin/create', {
    layout: 'admin-wysiwyg',
    title: 'Νέο Πρόγραμμα',
    type: 'prog',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/program/new
// -----------------------------------------------------------------------------
router.post('/new', asyncWrapper(async (req, res, next) => {

  let {
    id,
    slug,
    title,
    featured,
    multiText,
    singleText,
    image,
    attachments,
    subTitle1,
    subText1,
    subTitle2,
    subText2,
    subTitle3,
    subText3,
    subTitle4,
    subText4,
    subTitle5,
    subText5,
    subTitle6,
    subText6,
    hours,
    cost,
    location,
    tutor,
    programCategories,
  } = req.body;

  if ( featured == 'on')
    featured = 1;

  slug = title


  await Program.create({
      id: id,
      slug: slug,
      title: title,
      featured: featured,
      multiText: multiText,
      singleText: singleText,
      image: image,
      attachments: attachments,
      subTitle1: subTitle1,
      subText1: subText1,
      subTitle2: subTitle2,
      subText2: subText2,
      subTitle3: subTitle3,
      subText3: subText3,
      subTitle4: subTitle4,
      subText4: subText4,
      subTitle5: subTitle5,
      subText5: subText5,
      subTitle6: subTitle6,
      subText6: subText6,
      hours: hours,
      cost: cost,
      location: location,
      tutor: tutor,
      // categories: [{ text: 's'} ]
    }
    , {
      include: [{
        model: Category,
        as: 'categories'
      }]
    }).then(program => {

        program.setCategories(programCategories)


      console.log(program);
    })



  req.flash('success_msg', 'Το slider ' + title + ' δημιουργήθηκε με επιτυχία')
  res.redirect('/admin/program');

  // data = {
  //   documents: documents,
  //   images: images,
  //   categories: categories,
  //   programTypes: programTypes
  // }
  //
  // res.render('admin/create', {
  //   layout: 'admin-wysiwyg',
  //   title: 'Νέο Πρόγραμμα',
  //   type: 'prog',
  //   data: data
  // });

}));



// /* New Program POST */
// router.post('/new',   function(req, res, next) {
//
//
//   // Get params
//   var progTitle = req.body.programTitle;
//   var progText = req.body.programText;
//   var progCategories = req.body.programCategories;
//   var progImg = req.body.programImage;
//   var progMainPage = req.body.programMainPage;
//   var progAttachments = req.body.programAttachments;
//   var progGallery = req.body.programGalleryImages;
//   var progStartDate = req.body.programStartDate || null;
//   var progEndDate = req.body.programEndDate || null;
//   var progHours = req.body.programHours || null;
//   var progCost = req.body.programCost || null;
//   var progLocation = req.body.programLocation || null;
//   var progTeacher = req.body.programTeacher || null;
//   var progSections = req.body.progSections;
//   var section1title = req.body.section1title || null;
//   var section1text = req.body.section1text || null;
//   var section2title = req.body.section2title || null;
//   var section2text = req.body.section2text || null;
//   var section3title = req.body.section3title || null;
//   var section3text = req.body.section3text || null;
//   var section4title = req.body.section4title || null;
//   var section4text = req.body.section4text || null;
//   var section5title = req.body.section5title || null;
//   var section5text = req.body.section5text || null;
//   var section6title = req.body.section6title || null;
//   var section6text = req.body.section6text || null;
//
//   if (req.body.programMainPage == 'on')
//     progMainPage = 1;
//   else
//     progMainPage = 0;
//
//
//   Program.new(
//     progTitle,
//     progMainPage,
//     progText,
//     progCategories,
//     progAttachments,
//     progImg,
//     progGallery,
//     progStartDate,
//     progEndDate,
//     progHours,
//     progCost,
//     progLocation,
//     progTeacher,
//     progSections,
//     section1title,
//     section1text,
//     section2title,
//     section2text,
//     section3title,
//     section3text,
//     section4title,
//     section4text,
//     section5title,
//     section5text,
//     section6title,
//     section6text,
//     function(err, result) {
//
//       if (err) {
//         res.json(err);
//         return;
//       }
//       req.flash('success_msg', 'Το πρόγραμμα ' + progTitle + ' δημιουργήθηκε με επιτυχία')
//       res.redirect('/admin/program');
//
//     });
// });
//
// /* Edit Program GET */
// router.get('/:id/edit',   function(req, res, next) {
//   var id = req.params.id;
//   var docs = [],
//     images = [],
//     category = [];
//
//   fs.readdir('./public/files/uploads/docs', function(err, docFiles) {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     docFiles.forEach(function(item) {
//       var file = {};
//       file.name = item;
//       file.ext = path.extname(item).substring(1).toLowerCase();
//       file.type = 'doc';
//       docs.push(file);
//     })
//
//     fs.readdir('./public/files/uploads/images', function(err, imgFiles) {
//       if (err) {
//         res.json(err);
//         return;
//       }
//       imgFiles.forEach(function(item) {
//         var file = {};
//         file.name = item;
//         file.ext = path.extname(item).substring(1).toLowerCase();
//         file.type = 'img';
//         images.push(file);
//       })
//       Program.get(id, function(err, result) {
//         if (err) {
//           res.json(err);
//           return;
//         }
//         Category.getAll(function(err, categories) {
//           if (err) {
//             res.json(err);
//             return;
//           }
//           category = categories;
//
//           res.render('admin/edit', {
//             layout: 'admin-wysiwyg',
//             title: 'Επεξεργασία Προγράμματος',
//             type: 'prog',
//             result: result[0],
//             docs: docs,
//             images: images,
//             category: category
//           });
//         });
//       });
//
//
//     });
//
//   });
//
//
//
//
// });
// /* Edit Program POST */
// router.post('/:id/edit',   function(req, res, next) {
//
//   // Get params
//   var id = req.params.id;
//   var progTitle = req.body.programTitle;
//   var progText = req.body.programText;
//   var progCategories = req.body.programCategories;
//   var progImg = req.body.programImage;
//   var progMainPage = req.body.programMainPage;
//   var progAttachments = req.body.programAttachments;
//   var progGallery = req.body.programGalleryImages;
//   var progStartDate = req.body.programStartDate;
//   var progEndDate = req.body.programEndDate;
//   var progHours = req.body.programHours;
//   var progCost = req.body.programCost;
//   var progLocation = req.body.programLocation;
//   var progTeacher = req.body.programTeacher;
//   var progSections = req.body.progSections;
//   var section1title = req.body.section1title || null;
//   var section1text = req.body.section1text || null;
//   var section2title = req.body.section2title || null;
//   var section2text = req.body.section2text || null;
//   var section3title = req.body.section3title || null;
//   var section3text = req.body.section3text || null;
//   var section4title = req.body.section4title || null;
//   var section4text = req.body.section4text || null;
//   var section5title = req.body.section5title || null;
//   var section5text = req.body.section5text || null;
//   var section6title = req.body.section6title || null;
//   var section6text = req.body.section6text || null;
//
//   if (req.body.programMainPage == 'on')
//     progMainPage = 1;
//   else
//     progMainPage = 0;
//
//
//   Program.update(
//     id,
//     progTitle,
//     progMainPage,
//     progText,
//     progCategories,
//     progAttachments,
//     progImg,
//     progGallery,
//     progStartDate,
//     progEndDate,
//     progHours,
//     progCost,
//     progLocation,
//     progTeacher,
//     progSections,
//     section1title,
//     section1text,
//     section2title,
//     section2text,
//     section3title,
//     section3text,
//     section4title,
//     section4text,
//     section5title,
//     section5text,
//     section6title,
//     section6text,
//     function(err, result) {
//
//       if (err) {
//         res.json(err);
//         return;
//       }
//
//       req.flash('success_msg', 'Το πρόγραμμα ' + progTitle + ' ενημερώθηκε με επιτυχία')
//       res.redirect('/admin/program');
//
//     });
// });
//
//
// /* Delete Program GET */
// router.get('/:id/delete',   function(req, res, next) {
//   var id = req.params.id;
//   Program.get(id, function(err, result) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.render('admin/delete', {
//         layout: 'admin',
//         title: 'Διαγραφή Προγράμματος',
//         type: 'prog',
//         result: result[0]
//       });
//     }
//   });
// });
// /* Delete Program POST */
// router.post('/:id/delete',   function(req, res, next) {
//   var id = req.params.id;
//   Program.delete(id, function(err, result) {
//     if (err) {
//       res.json(err);
//     } else {
//       req.flash('success_msg', 'Το Πρόγραμμα διαγράφτηκε με επιτυχία')
//       res.redirect('/admin/program');
//     }
//   });
// });
//



module.exports = router;

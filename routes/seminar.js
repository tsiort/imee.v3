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
const Seminar = models.seminar;


// -----------------------------------------------------------------------------
// Data Arrays
// -----------------------------------------------------------------------------
let documents = [];
let images = [];
let seminars = [];

let data;


// -----------------------------------------------------------------------------
// Data retrieval executed before main routing
// -----------------------------------------------------------------------------
router.get('*', asyncWrapper(async (req, res, next) => {

  seminars = await Seminar.findAll({
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
// GET /admin/seminar
// -----------------------------------------------------------------------------
router.get('/', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
    seminars: seminars
  }


  res.render('admin/seminar', {
    layout: 'admin',
    title: 'Προγράμματα',
    type: 'semin',
    data: data
  });

}));
// -----------------------------------------------------------------------------
// GET /admin/seminar/new
// -----------------------------------------------------------------------------
router.get('/new', asyncWrapper(async (req, res, next) => {

  data = {
    documents: documents,
    images: images,
  }

  res.render('admin/create', {
    layout: 'admin-wysiwyg',
    title: 'Νέο Πρόγραμμα',
    type: 'semin',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/seminar/new
// -----------------------------------------------------------------------------
router.post('/new', asyncWrapper(async (req, res, next) => {

  let {
    id,
    slug,
    title,
    featured,
    easyAccess,
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
    tutor
  } = req.body;

  if (featured == 'on')
    featured = 1;
  if (easyAccess == 'on')
    easyAccess = 1;

  slug = title


  let seminar = await Seminar.create({
    id: id,
    slug: slug,
    title: title,
    featured: featured,
    easyAccess: easyAccess,
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
  });


  req.flash('success_msg', 'Το πρόγραμμα ' + title + ' δημιουργήθηκε με επιτυχία')
  res.redirect('/admin/seminar');

}));


// -----------------------------------------------------------------------------
// GET /admin/seminar/:id/edit
// -----------------------------------------------------------------------------
router.get('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let seminar = await Seminar.findByPk(id, {
    where: {
      status: 'active'
    }
  });

  console.log(seminar);
  data = {
    documents: documents,
    images: images,
    program: seminar
  }

  res.render('admin/edit', {
    layout: 'admin-wysiwyg',
    title: 'Αλλαγή Προγράμματος',
    type: 'semin',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/seminar/:id/edit'
// -----------------------------------------------------------------------------
router.post('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let {
    slug,
    title,
    featured,
    easyAccess,
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
    tutor
  } = req.body;

  if (featured == 'on')
    featured = 1;
  if (easyAccess == 'on')
    easyAccess = 1;

  slug = title


  await Seminar.update({
    slug: slug,
    title: title,
    featured: featured,
    easyAccess: easyAccess,
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
  }, {
    where: {
      id: id
    }
  });


  let seminar = await Seminar.findByPk(id, {
    where: {
      status: 'active'
    }
  });

  req.flash('success_msg', 'Το πρόγραμμα ' + title + ' ενημερώθηκε με επιτυχία');
  res.redirect('/admin/seminar');

}));


// -----------------------------------------------------------------------------
// GET /admin/seminar/:id/delete
// -----------------------------------------------------------------------------
router.get('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let seminar = await Seminar.findByPk(id, {
    where: {
      status: 'active'
    }
  });


  data = {
    documents: documents,
    images: images,
    program: seminar
  }

  res.render('admin/delete', {
    layout: 'admin-wysiwyg',
    title: 'Αλλαγή Προγράμματος',
    type: 'semin',
    data: data
  });

}));

// -----------------------------------------------------------------------------
// POST /admin/seminar/:id/delete
// -----------------------------------------------------------------------------
router.post('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  await Seminar.update({
    status: 'inactive',
  }, {
    where: {
      id: id
    }
  });


  req.flash('success_msg', 'Το πρόγραμμα διαγράφτηκε με επιτυχία')
  res.redirect('/admin/seminar');


}));


module.exports = router;

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
    }],
    include: [{
      model: ProgramType
    }]
  });


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
    programTypeId,
  } = req.body;

  if (featured == 'on')
    featured = 1;

  slug = title


  let program = await Program.create({
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
    programTypeId: programTypeId,
    megaNavId: null
  }, {
    include: [{
      model: Category,
      as: 'categories'
    }],
    include: [{
      model: ProgramType,
    }]
  });

  await program.setCategories(programCategories);

  req.flash('success_msg', 'Το πρόγραμμα ' + title + ' δημιουργήθηκε με επιτυχία')
  res.redirect('/admin/program');

}));


// -----------------------------------------------------------------------------
// GET /admin/program/:id/edit
// -----------------------------------------------------------------------------
router.get('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let program = await Program.findByPk(id, {
    where: {
      status: 'active'
    },
    include: [{
        model: Category,
      },
      {
        model: ProgramType
      }
    ],
  });


  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes,
    program: program
  }

  res.render('admin/edit', {
    layout: 'admin-wysiwyg',
    title: 'Αλλαγή Προγράμματος',
    type: 'prog',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/program/:id/edit'
// -----------------------------------------------------------------------------
router.post('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let {
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
    programTypeId,
  } = req.body;

  if (featured == 'on')
    featured = 1;

  slug = title


  await Program.update({
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
    programTypeId: programTypeId,
  }, {
    where: {
      id: id
    }
  }, {
    include: [{
      model: Category,
      as: 'categories'
    }],
    include: [{
      model: ProgramType,
    }]
  });


  let program = await Program.findByPk(id, {
    where: {
      status: 'active'
    },
    include: [{
        model: Category,
      },
      {
        model: ProgramType
      }
    ],
  });
  await program.setCategories(programCategories);


  req.flash('success_msg', 'Το πρόγραμμα ' + title + ' ενημερώθηκε με επιτυχία');
  res.redirect('/admin/program');

}));


// -----------------------------------------------------------------------------
// GET /admin/program/:id/delete
// -----------------------------------------------------------------------------
router.get('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let program = await Program.findByPk(id, {
    where: {
      status: 'active'
    },
    include: [{
        model: Category,
      },
      {
        model: ProgramType
      }
    ],
  });


  data = {
    documents: documents,
    images: images,
    categories: categories,
    programTypes: programTypes,
    program: program
  }

  res.render('admin/delete', {
    layout: 'admin-wysiwyg',
    title: 'Αλλαγή Προγράμματος',
    type: 'prog',
    data: data
  });

}));

// -----------------------------------------------------------------------------
// POST /admin/program/:id/delete
// -----------------------------------------------------------------------------
router.post('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  await Program.update({
    status: 'inactive',
  }, {
    where: {
      id: id
    }
  });


  req.flash('success_msg', 'Το πρόγρ; διαγράφτηκε με επιτυχία')
  res.redirect('/admin/program');


}));


module.exports = router;

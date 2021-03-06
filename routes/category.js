var express = require('express');
var router = express.Router();

const asyncWrapper = require("../middleware/asyncMiddleware");


// -----------------------------------------------------------------------------
// Model includes
// -----------------------------------------------------------------------------
const models = require("../models");
const Category = models.category;


// -----------------------------------------------------------------------------
// Data Arrays
// -----------------------------------------------------------------------------
let categories = [];

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

  next();
}));


// -----------------------------------------------------------------------------
// GET /admin/category
// -----------------------------------------------------------------------------
router.get('/', asyncWrapper(async (req, res, next) => {

  data = {
    categories: categories
  }

  res.render('admin/categories', {
    layout: 'admin',
    title: 'Κατηγορίες',
    type: 'cat',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// GET /admin/new
// -----------------------------------------------------------------------------
router.get('/new', asyncWrapper(async (req, res, next) => {

  data = {
    categories: categories
  }

  res.render('admin/create', {
    layout: 'admin',
    title: 'Νεα Κατηγορία',
    type: 'cat',
    data: data
  });
}));

// -----------------------------------------------------------------------------
// POST /admin/new
// -----------------------------------------------------------------------------
router.post('/new', asyncWrapper(async (req, res, next) => {

  let {
    text
  } = req.body;

  await Category.create({
    text: text
  });

  req.flash('success_msg', 'Η Κατηγορία ' + text + ' δημιουργήθηκε με επιτυχία')
  res.redirect('/admin/category');

}));


// -----------------------------------------------------------------------------
// GET /admin/:id/delet
// -----------------------------------------------------------------------------
router.get('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let category = await Category.findByPk(id);

  data = {
    category: category
  }

  res.render('admin/delete', {
    layout: 'admin',
    title: 'Διαγραφή Κατηγορίας',
    type: 'cat',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/:id/delet
// -----------------------------------------------------------------------------
router.post('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  await Category.update({
    status: 'inactive',
  }, {
    where: {
      id: id
    }
  });

  req.flash('success_msg', 'Η Κατηγορία διαγράφτηκε με επιτυχία')
  res.redirect('/admin/category');

}));


// -----------------------------------------------------------------------------
// GET /admin/:id/edit
// -----------------------------------------------------------------------------
router.get('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let category = await Category.findByPk(id);

  data = {
    category: category
  }

  res.render('admin/edit', {
    layout: 'admin',
    title: 'Επεξεργασία Κατηγορίας',
    type: 'cat',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// POST /admin/:id/edit
// -----------------------------------------------------------------------------
router.post('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    text
  } = req.body;

  let {
    id
  } = req.params;

  await Category.update({
    text: text
  }, {
    where: {
      id: id
    }
  });

  req.flash('success_msg', 'Η Κατηγορία μετονομάστηκε σε ' + text + ' με επιτυχία')
  res.redirect('/admin/category');

}));


module.exports = router;

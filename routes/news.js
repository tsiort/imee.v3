const express = require('express');
const router = express.Router();

const asyncWrapper = require("../middleware/asyncMiddleware");

// -----------------------------------------------------------------------------
// Model includes
// -----------------------------------------------------------------------------
const models = require("../models");
const News = models.announcement;


// -----------------------------------------------------------------------------
// Data Arrays
// -----------------------------------------------------------------------------
let news = [];

let data;


// -----------------------------------------------------------------------------
// Data retrieval executed before main routing
// -----------------------------------------------------------------------------
router.get('*', asyncWrapper(async (req, res, next) => {

  news = await News.findAll({
    where: {
      status: 'active'
    }
  });

  next();
}));

// -----------------------------------------------------------------------------
// GET /admin/news
// -----------------------------------------------------------------------------
router.get('/', asyncWrapper(async (req, res, next) => {

  data = {
    news: news
  }

  res.render('admin/news', {
    layout: 'admin',
    title: 'Ανακοινώσεις',
    type: 'news',
    data: data
  });

}));


// -----------------------------------------------------------------------------
// GET /admin/news/new
// -----------------------------------------------------------------------------
router.get('/new', asyncWrapper(async (req, res, next) => {

  res.render('admin/create', {
    layout: 'admin-wysiwyg',
    title: 'Νέα Ανακοίνωση',
    type: 'news'
  });

}));

// -----------------------------------------------------------------------------
// POST /admin/news/new
// -----------------------------------------------------------------------------
router.post('/new', asyncWrapper(async (req, res, next) => {

  let {
    id,
    slug,
    title,
    featured,
    text,
    attachments
  } = req.body || null;


  if (featured == 'on')
    featured = 1;

  slug = title

  let news = await News.create({
    id: id,
    slug: slug,
    title: title,
    featured: featured,
    text: text,
    attachments: attachments,
  })

  req.flash('success_msg', 'Η Ανακοίνωση ' + title + ' δημιουργήθηκε με επιτυχία')
  res.redirect('/admin/news');

}));


// -----------------------------------------------------------------------------
// GET /admin/news/:id/edit
// -----------------------------------------------------------------------------
router.get('/:id/edit', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;


  let news = await News.findByPk(id, {
    where: {
      status: 'active'
    }
  })

  data = {
    news: news
  }

  res.render('admin/edit', {
    layout: 'admin-wysiwyg',
    title: 'Επεξεργασία Ανακοίνωσης',
    type: 'news',
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
    text,
    attachments
  } = req.body || null;

  if (featured == 'on')
    featured = 1;

  slug = title

  await News.update({
    id: id,
    slug: slug,
    title: title,
    featured: featured,
    text: text,
    attachments: attachments,
  }, {
    where: {
      id: id
    }
  });

  req.flash('success_msg', 'Η Ανακοίνωση ' + title + ' ενημερώθηκε με επιτυχία')
  res.redirect('/admin/news');
}));



// -----------------------------------------------------------------------------
// GET /admin/news/:id/delete
// -----------------------------------------------------------------------------
router.get('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;

  let news = await News.findByPk(id, {
    where: {
      status: 'active'
    }
  })

  data = {
    news: news
  }

  res.render('admin/delete', {
    layout: 'admin',
    title: 'Διαγραφή Ανακοίνωσης',
    type: 'news',
    data: data
  });
}));

// -----------------------------------------------------------------------------
// POST /admin/news/:id/delete
// -----------------------------------------------------------------------------
router.post('/:id/delete', asyncWrapper(async (req, res, next) => {

  let {
    id
  } = req.params;


  await News.update({
    status: 'inactive',
  }, {
    where: {
      id: id
    }
  });

  req.flash('success_msg', 'Η Ανακοίνωση διαγράφτηκε με επιτυχία')
  res.redirect('/admin/news');

}));


module.exports = router;

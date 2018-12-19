var express = require('express');
var router = express.Router();

var News = require('../models/news.js');

/* News GET */
router.get('/', authenticationMiddleware(), function(req, res, next) {

  News.getAll(function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/news', {
      layout: 'admin',
      title: 'Ανακοινώσεις',
      type: 'news',
      news: result
    });
  });
});

/* New Announcement GET */
router.get('/new', authenticationMiddleware(), function(req, res, next) {
  res.render('admin/create', {
    layout: 'admin-wysiwyg',
    title: 'Νέα Ανακοίνωση',
    type: 'news'
  });
});

/* New Announcement POST */
router.post('/new', authenticationMiddleware(), function(req, res, next) {

  // Get params
  var newsTitle = req.body.newsTitle;
  var newsText = req.body.newsText;
  var newsMainPage = req.body.newsMainPage;

  if (req.body.newsMainPage == 'on')
    newsMainPage = 1;
  else
    newsMainPage = 0;

  News.new(newsMainPage, newsTitle, newsText, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    req.flash('success_msg', 'Η Ανακοίνωση ' + newsTitle + ' δημιουργήθηκε με επιτυχία')
    res.redirect('/admin/news');
  });
});

/* Edit Announcement GET */
router.get('/:id/edit', authenticationMiddleware(), function(req, res, next) {

  var id = req.params.id;


  News.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/edit', {
      layout: 'admin-wysiwyg',
      title: 'Επεξεργασία Ανακοίνωσης',
      type: 'news',
      result: result[0],
    });
  });
});

/* Edit Announcement POST */
router.post('/:id/edit', authenticationMiddleware(), function(req, res, next) {

  // Get params
  var id = req.params.id;
  var newsTitle = req.body.newsTitle;
  var newsText = req.body.newsText;
  var newsMainPage = req.body.newsMainPage;

  if (req.body.newsMainPage == 'on')
    newsMainPage = 1;
  else
    newsMainPage = 0;


  News.update(id, newsMainPage, newsTitle, newsText, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    req.flash('success_msg', 'Η Ανακοίνωση ' + newsTitle + ' ενημερώθηκε με επιτυχία')
    res.redirect('/admin/news');
  });
});

/* Delete Announcement GET */
router.get('/:id/delete', authenticationMiddleware(), function(req, res, next) {

  var id = req.params.id;

  News.get(id, function(err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.render('admin/delete', {
      layout: 'admin',
      title: 'Διαγραφή Ανακοίνωσης',
      type: 'news',
      result: result[0]
    });
  });
});

/* Delete Announcement POST */
router.post('/:id/delete', authenticationMiddleware(), function(req, res, next) {

  var id = req.params.id;

  News.delete(id, function(err, result) {
    if (err) {
      res.json(err);
    } else {
      req.flash('success_msg', 'Η Ανακοίνωση διαγράφτηκε με επιτυχία')
      res.redirect('/admin/news');
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

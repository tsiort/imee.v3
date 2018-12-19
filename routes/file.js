var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var fileUpload = require('express-fileupload');
// var Category = require('../models/category.js');


/* File GET */
router.get('/', authenticationMiddleware(), function(req, res, next) {

  var docs = [],
    images = [];

  fs.readdir('./public/files/uploads/docs', function(err, docFiles) {
    if (err) {
      res.json(err);
      return;
    }
    docFiles.forEach(function(item) {
      var file = {};
      file.name = item;
      file.ext = path.extname(item).substring(1).toLowerCase();
      file.type = 'doc';
      docs.push(file);
    })

    fs.readdir('./public/files/uploads/images', function(err, imgFiles) {
      if (err) {
        res.json(err);
        return;
      }
      imgFiles.forEach(function(item) {
        var file = {};
        file.name = item;
        file.ext = path.extname(item).substring(1).toLowerCase();
        file.type = 'img';
        images.push(file);
      })

      res.render('admin/file', {
        layout: 'admin',
        title: 'Διαχείριση Αρχείων',
        type: 'file',
        docs: docs,
        images: images
      });

    });

  });

});
// File Edit GET
router.get('/edit/:type/:name', authenticationMiddleware(), function(req, res, next) {

  var filePath = './public/files/uploads/';
  var type = req.params.type;
  var filename = req.params.name;
  var displayImgPath;

  if (type == 'doc') {
    filePath += 'docs/';
  } else if (type == 'img') {
    filePath += 'images/';
    displayImgPath = '/files/uploads/images/';
    displayImgPath = displayImgPath.concat(filename);
  } else {
    req.flash('error_msg', 'Μη αποδεκτός τύπος αρχείου');
    res.redirect(req.originalUrl);
    return;
  }

  if (!fs.existsSync(filePath.concat(filename))) {
    req.flash('error_msg', 'Δεν υπάρχει το αρχείο ' + filename + ' στη τοποθεσία ' + filePath);
    res.redirect(req.originalUrl);
    return;
  }

  res.render('admin/edit', {
    layout: 'admin',
    title: 'Επεξεργασία Αρχείου',
    type: 'file',
    ftype: type,
    name: filename,
    path: filePath,
    disppath: displayImgPath
  });
});
// File Edit POST
router.post('/edit/:type/:name', authenticationMiddleware(), function(req, res, next) {



  var filePath = './public/files/uploads/';
  var type = req.params.type;
  var filename = req.params.name;
  var newFilename = req.body.filename;
  var regexMatcher;


  // Check for file type
  if (type == 'doc') {
    filePath += 'docs/';
    regexMatcher = /.\.(doc|docx|pdf|odt|txt|ppt|pptx)$/i;
  } else if (type == 'img') {
    filePath += 'images/';
    regexMatcher = /.\.(png|jpeg|jpg|gif|gfif|tiff|bpg)$/i;
  } else {
    req.flash('error_msg', 'Μη αποδεκτός τύπος αρχείου');
    res.redirect('/admin/file');
    return;
  }

  // Check for valid filename
  if (!newFilename.match(regexMatcher)) {
    req.flash('error_msg', 'Μη αποδεκτή κατάληξη αρχείου')
    res.redirect(req.originalUrl);
    return;
  }


  var oldPath = filePath.concat(filename);
  var newPath = filePath.concat(newFilename);

  // Check if the file to be changed exists
  if (!fs.existsSync(oldPath)) {
    req.flash('error_msg', 'Δεν υπάρχει το αρχείο ' + filename + ' στη τοποθεσία ' + filePath);
    res.redirect('/admin/file');
    return;
  }
  // Check if the new filename already exists
  if (fs.existsSync(newPath)) {
    req.flash('error_msg', 'Υπάρχει ήδη αρχείο με όνομα ' + newFilename + ' αρχείο στη τοποθεσία ' + filePath);
    res.redirect(req.originalUrl);
    return;
  }

  fs.rename(oldPath, newPath, function(err) {
    if (err) {
      req.flash('error_msg', 'H διαδικασία απέτυχε')
      res.redirect('/admin/file');
      return;
    }
    req.flash('success_msg', 'Tο αρχείο ' + filename + ' μετονομάστηκε σε ' + newFilename);
    res.redirect('/admin/file');
  })


});
// File Delete GET
router.get('/delete/:type/:name', authenticationMiddleware(), function(req, res, next) {

  var filePath = './public/files/uploads/';
  var type = req.params.type;
  var filename = req.params.name;
  var displayImgPath;

  if (type == 'doc') {
    filePath += 'docs/';
  } else if (type == 'img') {
    filePath += 'images/';
    displayImgPath = '/files/uploads/images/';
    displayImgPath = displayImgPath.concat(filename);
  } else {
    req.flash('error_msg', 'Μη αποδεκτός τύπος αρχείου');
    res.redirect(req.originalUrl);
    return;
  }

  if (!fs.existsSync(filePath.concat(filename))) {
    req.flash('error_msg', 'Δεν υπάρχει το αρχείο ' + filename + ' στη τοποθεσία ' + filePath);
    res.redirect(req.originalUrl);
    return;
  }

  res.render('admin/delete', {
    layout: 'admin',
    title: 'Επεξεργασία Αρχείου',
    type: 'file',
    ftype: type,
    name: filename,
    path: filePath,
    disppath: displayImgPath
  });
});
// File Delete POST
router.post('/delete/:type/:name', authenticationMiddleware(), function(req, res, next) {



  var filePath = './public/files/uploads/';
  var type = req.params.type;
  var filename = req.params.name;
  var regexMatcher;


  // Check for file type
  if (type == 'doc') {
    filePath += 'docs/';
    regexMatcher = /.\.(doc|docx|pdf|odt|txt|ppt|pptx)$/i;
  } else if (type == 'img') {
    filePath += 'images/';
    regexMatcher = /.\.(png|jpeg|jpg|gif|gfif|tiff|bpg)$/i;
  } else {
    req.flash('error_msg', 'Μη αποδεκτός τύπος αρχείου');
    res.redirect(req.originalUrl);
    return;
  }

  // Check for valid filename
  if (!filename.match(regexMatcher)) {
    req.flash('error_msg', 'Μη αποδεκτή κατάληξη αρχείου')
    res.redirect(req.originalUrl);
    return;
  }


  var unlinkPath = filePath.concat(filename);


  // Check if the file to be changed exists
  if (!fs.existsSync(unlinkPath)) {
    req.flash('error_msg', 'Δεν υπάρχει το αρχείο ' + filename + ' στη τοποθεσία ' + filePath);
    res.redirect(req.originalUrl);
    return;
  }
  // // Check if the new filename already exists
  // if (fs.existsSync(newPath)) {
  //   req.flash('error_msg', 'Υπάρχει ήδη αρχείο με όνομα ' + newFilename + ' αρχείο στη τοποθεσία ' + filePath);
  //   res.redirect('/admin/file');
  //   return;
  // }


  fs.unlink(unlinkPath, function(err) {
    if (err) {
      req.flash('error_msg', 'H διαδικασία απέτυχε')
      res.redirect('/admin/file');
      return;
    }
    req.flash('success_msg', 'Tο αρχείο ' + filename + ' διαγράφτηκε ');
    res.redirect('/admin/file');
  })


});
// File Upload GET
router.get('/upload', authenticationMiddleware(), function(req, res, next) {
  res.render('admin/upload', {
    layout: 'admin',
    title: 'Ανέβασμα Αρχείου',
    type: 'file'
  });
});
// File Upload POST
router.post('/upload', authenticationMiddleware(), function(req, res, next) {

  if (!req.files || !req.files.file) {
    req.flash('error_msg', 'Επιλέξτε κάποιο αρχείο');
    res.redirect(req.originalUrl);
    return;
  }

  var filePath = './public/files/uploads/';
  var fileType = req.body.fileType;
  var file = req.files.file;
  var regexMatcher;



  // Check for file type
  if (fileType == 'doc') {
    filePath += 'docs/';
    regexMatcher = /.\.(doc|docx|pdf|odt|txt|ppt|pptx)$/i;
  } else if (fileType == 'img') {
    filePath += 'images/';
    regexMatcher = /.\.(png|jpeg|jpg|gif|gfif|tiff|bpg)$/i;
  } else {
    req.flash('error_msg', 'Μη αποδεκτός τύπος αρχείου');
    res.redirect(req.originalUrl);
    return;
  }

  // Check for valid filename
  if (!file.name.match(regexMatcher)) {
    req.flash('error_msg', 'Δεν επιτρέπεται αυτός ο τύπος αρχείου');
    res.redirect(req.originalUrl);
    return;
  }

  // Check if the new filename already exists
  if (fs.existsSync(filePath+file.name)) {
    req.flash('error_msg', 'Υπάρχει ήδη αρχείο με όνομα ' + file.name + ' αρχείο στη τοποθεσία ' + filePath);
    res.redirect(req.originalUrl);
    return;
  }



  // Use the mv() method to place the file somewhere on your server
  file.mv(filePath+file.name, function(err) {
    if (err) {
      req.flash('error_msg', 'Λάθος στη μετακίνηση του αρχείου');
      res.redirect(req.originalUrl);
      return;
    }
    req.flash('success_msg', 'Το αρχείο μεταφορτώθηκε με επιτυχία');
    res.redirect('/admin/file');
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

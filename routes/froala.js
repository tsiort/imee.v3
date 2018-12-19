var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var FroalaEditor = require('wysiwyg-editor-node-sdk/lib/froalaEditor.js');

router.get('/load_images', authenticationMiddleware(), function (req, res) {

  FroalaEditor.Image.list('../public/files/uploads/images/','/files/uploads/images/', function(err, data) {
    // console.log(data);
    data.forEach(function(dataItem) {
      dataItem.url = dataItem.thumb;
    })

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    return res.send(data);
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

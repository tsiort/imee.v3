var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var exphbs = require('express-handlebars')
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
// var foreasRouter = require('./routes/foreas');
var adminRouter = require('./routes/admin');
var categRouter = require('./routes/category');
var progrRouter = require('./routes/program');
// var newsRouter  = require('./routes/news');
var filesRouter = require('./routes/file');
var settingsRouter = require('./routes/settings');

// WYSIWYG Request Handler
var froalaHandler = require('./routes/froala');

var app = express();
app.use(favicon(path.join(__dirname,'public','images', 'favicon.ico')));

// view engine setup
app.engine("hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("./helpers/handlebars.js").helpers, // same file that gets used on our client
  partialsDir: "views/partials/", // same as default, I just like to be explicit
  layoutsDir: "views/layouts/" // same as default, I just like to be explicit
}));
app.set("view engine", "hbs");



// Passport
app.use(cookieParser());
app.use(session({
  secret: 'process.env.SECRET',
  cookie: { maxAge: 600000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
// Connect Flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// Upload module
app.use(fileUpload());


// Models
var models = require("./models");

//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync({force: false}).then(function() {
  console.log('Nice! Database looks fine')

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!")
});



app.use('/', indexRouter);
// app.use('/foreas', foreasRouter);
app.use('/admin', adminRouter);
app.use('/admin/category', categRouter);
app.use('/admin/program', progrRouter);
// app.use('/admin/news', newsRouter);
app.use('/admin/file', filesRouter);
app.use('/admin/settings', settingsRouter);
app.use('/admin/froala', froalaHandler);




// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.user || null;
  res.locals.isAuthenticated = req.isAuthenticated();
  // res.locals.username = req.session.passport.user;
  next();
});


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;

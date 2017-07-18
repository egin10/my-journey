const express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  url = require('./config/db').url,
  app = express();

//MongoDB Connection
mongoose.Promise = require('bluebird');
mongoose.connect(url, {useMongoClient: true});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'KiwKiwKiw',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//=== ROUTES
const index = require('./routes/index'),
  userRoute = require('./routes/users');

app.use('/', index);
app.use('/user', userRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

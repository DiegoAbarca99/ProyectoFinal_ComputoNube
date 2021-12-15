
//Instanciación dependencias
const express = require('express');
const engine= require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const multer = require('multer');
const { format } = require('timeago.js');
const uuid = require('uuid/v4');



// Initializations
const app = express();
require('./database');
require('./passport/local-auth.js')


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Settings
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename) => {
      console.log(file);
      cb(null, uuid() + path.extname(file.originalname));
  }
}) 
app.use(multer({storage}).single('image'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Global Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});
app.use((req, res, next) => {
  app.locals.success_msg = req.flash('success_msg');
  app.locals.error_msg = req.flash('error_msg');
  app.locals.error_password=req.flash('error_password');
  app.locals.signinMessage=req.flash('signinMessage');
  app.locals.signupMessage=req.flash('signupMessage');
  app.locals.administradores = req.administradores;
  next();
});


// routes
app.use(require('./routes/index.js'));
app.use(require('./routes/Administrador/signinAdm.js'));
app.use(require('./routes/Administrador/signupAdm.js'));
//app.use(require('./routes/users'));


// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

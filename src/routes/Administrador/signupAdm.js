const flash = require('connect-flash/lib/flash');
const express=require('express');
const router=express.Router();
const Admi=require('../../models/administradores.js');
const passport = require('passport');
const {body, validationResult} = require('express-validator');


router.get('/Administrador/signupAdm.ejs', (req, res,next) => {
    
   res.render("Administrador/signupAdm.ejs",{message: flash('error_msg') });
 
});
  
router.get('/Administrador/signinAdm.ejs', (req, res,next) => {
    
  res.render("Administrador/signinpAdm.ejs",{message: flash('success_msg')});
 
 });

 


  router.get('/index.ejs', (req, res,next) => {
  
   res.render("index");
  
  });
 



 router.post('/registrarse', passport.authenticate('local-signup', {
  successRedirect: '/Administrador/signinAdm.ejs',
  failureRedirect: '/Administrador/signupAdm.ejs',
  passReqToCallback: true
})); 
   
    

  
  module.exports = router;
  
const express=require('express');
const { is } = require('express/lib/request');
const router=express.Router();
const passport = require('passport');
const Admi=require('../../models/administradores.js');
const tasks = require('../../models/tasks.js');
const Note = require('../../models/tasks.js');
const Image = require('../../models/Image.js');
const Empleado = require('../../models/empleados.js');
const path = require('path');
const { unlink } = require('fs-extra');

router.get('/Administrador/signinAdm.ejs', (req, res,next) => {
  
   res.render("Administrador/signinAdm.ejs");
  
  });


 
  router.post('/ingresar', passport.authenticate('local-signin', {
    successRedirect: '/Administrador/indexAdm.ejs',
    failureRedirect: '/Administrador/signinAdm.ejs',
    passReqToCallback: true
  })); 

  
  
  router.get('/Administrador/about.ejs',isAuthenticated, (req, res, next) => {
    res.render('Administrador/about.ejs');
   
  });

 router.get('/index.ejs', (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'Haz cerrado sesión.');
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}


//---------------------Gestor de tareas----------------------------------
router.get('/Administrador/tasks.ejs',isAuthenticated, async (req, res) => {
  const task = await Note.find();
  res.render('Administrador/tasks.ejs', {
    task
  });
 
});



router.post('/add',isAuthenticated, async (req, res, next) => {
  const task = new Note(req.body);
  await task.save();
  res.redirect('/Administrador/tasks.ejs');
});
 

  router.get('/turn/:id', async (req, res, next) => {
    let { id } = req.params;
    const task = await Note.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/Administrador/tasks.ejs');
  });
  
  
  router.get('/edit/:id',isAuthenticated, async (req, res, next) => {
    const task = await Note.findById(req.params.id);
    console.log(task)
    res.render('Administrador/editTask.ejs', { task });
  });
  
  router.post('/edit/:id',isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    await Note.updateOne({_id: id}, req.body);
    res.redirect('/Administrador/tasks.ejs');
  });
  
  router.get('/delete/:id',isAuthenticated, async (req, res, next) => {
    let { id } = req.params;
    await Note.remove({_id: id});
    res.redirect('/Administrador/tasks.ejs');
  });



  //-------------------------------Gestor de inventario----------------------------------------------
  router.get('/Administrador/indexAdm.ejs',isAuthenticated, async (req, res) => {
    const images = await Image.find();
    res.render('Administrador/indexAdm.ejs', { images });
    console.log
});

router.get('/Administrador/inventario.ejs', isAuthenticated, (req, res) => {
    res.render('Administrador/inventario.ejs');
});

router.post('/upload', isAuthenticated,async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/Administrador/indexAdm.ejs');
});

router.get('/image/:id',isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('Administrador/profile.ejs', { image });
});

router.get('/image/:id/delete',isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/Administrador/indexAdm.ejs');
});

  

 //---------------------Empleados-------------------------------

 router.get('/Administrador/empleados.ejs',isAuthenticated, async (req, res) => {
  const empleado = await Empleado.find();
  res.render('Administrador/empleados.ejs', {
    empleado
  });
 
});



router.post('/addE',isAuthenticated, async (req, res, next) => {
  const empleado = new Empleado(req.body);
  await empleado.save();
  res.redirect('/Administrador/empleados.ejs');
});
 
  
  
  router.get('/editE/:id',isAuthenticated, async (req, res, next) => {
    const empleado = await Empleado.findById(req.params.id);

    res.render('Administrador/editEmpleado.ejs', { empleado });
  });
  
  router.post('/editE/:id',isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    await Empleado.updateOne({_id: id}, req.body);
    res.redirect('/Administrador/empleados.ejs');
  });
  
  router.get('/deleteE/:id',isAuthenticated, async (req, res, next) => {
    let { id } = req.params;
    await Empleado.remove({_id: id});
    res.redirect('/Administrador/empleados.ejs');
  });
  
  module.exports = router;

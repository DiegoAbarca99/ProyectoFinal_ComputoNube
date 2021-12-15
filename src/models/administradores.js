const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


const AdministradorSchema = Schema({
  email:{type:String, required: true},
  password:{ type:String, required:true}


  
});

AdministradorSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  
  AdministradorSchema.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('administradores', AdministradorSchema);

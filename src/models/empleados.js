const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadoSchema = Schema({
  nombre: String,
  apellido: String,
  telefono:Number,
  direccion:String,
  sueldo:Number
});

module.exports = mongoose.model('empleados', EmpleadoSchema);

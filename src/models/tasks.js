const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  titulo: {
    type: String,
   
  },
  descripcion: {
    type: String,
   
  },
  fecha: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Note', NoteSchema);

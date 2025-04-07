const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, required: true }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

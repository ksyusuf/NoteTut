const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const Category = require('../models/Category');

// GET: Tüm notları al
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate('category', 'name');
    // bununla birlikte, ikincil anahtar olarak tutulan verinin ilgil tablodaki
    // bu örnek için 'name' olan etiket değerini alabiliyoruz.
    const categories = await Category.find(); // kategorileri sidebar için gönderiyorum.
    res.json({notes, categories});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Yeni not ekle
router.post('/', async (req, res) => {
  const categories = await Category.find(); 
  const note = new Note({
    header: req.body.header,
    content: req.body.content,
    // not yüklerken de veritabanından ilgili kategorinin varlığını kontrol ediyorum.
    category: categories.find(category => category.name === req.body.category),
    date: req.body.date
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware: ID'ye göre notu bul
async function getNote (req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.note = note;
  next();
}

// GET: ID'ye göre not al
router.get('/:id', getNote, (req, res) => {
  res.json(res.note);
});

// PATCH: Notu güncelle
router.patch('/:id', getNote, async (req, res) => {
  // göndereceğimiz veriye gelen istekleri yerleştiriyoruz.
  res.note.header = req.body.header;
  res.note.content = req.body.content;
  const categories = await Category.find(); 
  // notu güncellerken de kategoriyi veritabanından çekerek kontrol ile iletiyorum.
  res.note.category = categories.find(category => category.name === req.body.category);
  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Notu sil
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.deleteOne();
    res.json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

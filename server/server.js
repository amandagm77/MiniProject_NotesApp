const path = require('path'); // ✅ already added
const Note = require('./models/Note');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ SERVE FRONTEND FILES (ADD THIS SECTION)
app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../src')));

// Routes

// ✅ REPLACE THIS ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// ✅ KEEP ALL YOUR API ROUTES (NO CHANGES)
app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

app.put('/api/notes/:id', async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedNote);
});

app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// ✅ Export app for testing
module.exports = app;

// ✅ Only run server if NOT in test
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}
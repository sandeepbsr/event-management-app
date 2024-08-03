const express = require('express');
const db = require('./database');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, date, location, description } = req.body;
  db.run('INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)', [name, date, location, description], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM events', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  db.run('UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?', [name, date, location, description, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM events WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

module.exports = router;

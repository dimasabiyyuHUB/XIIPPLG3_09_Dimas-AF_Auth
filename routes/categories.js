const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get( '/categories',(req, res) => {
    db.query('SELECT * FROM kategori', (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons 500
      } else {
      // Cetak hasil query ke terminal untuk debugging
      res.status(200).json(results); // Kirim hasil query sebagai JSON ke client
      }
    });
  }),

  router.post('/categories', (req, res) => {
    console.log(req.body);
    
    const { name } = req.body;

    // Validasi input
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    // Query untuk memasukkan kategori
    db.query(
        "INSERT INTO kategori (name) VALUES (?)",
        [name],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Kategori berhasil ditambahkan.", id: result.insertId });
        }
    );
});


router.put('/categories/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.query('UPDATE kategori SET name = ? WHERE id = ?', [name, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({  message : 'Category Updated',id, name});
    }
  });
});

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM kategori WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({  message : 'Category Deleted',id});
    }
  });
});


module.exports = router
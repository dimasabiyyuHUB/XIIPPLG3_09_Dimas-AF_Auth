const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all loans
router.get('/', (req, res) => {
  db.query('SELECT * FROM loans', (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new loan
router.post('/', (req, res) => {
  const { book_id, user_id, loan_date, return_date } = req.body;
  if (!book_id || !user_id || !loan_date) {
    return res.status(400).json({ error: 'book_id, user_id, and loan_date are required' });
  }
  db.query(
    'INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES (?, ?, ?, ?)',
    [book_id, user_id, loan_date, return_date],
    (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: results.insertId, book_id, user_id, loan_date, return_date });
      }
    }
  );
});

// Update a loan
router.put('/:id', (req, res) => {
  const { book_id, user_id, loan_date, return_date } = req.body;
  const { id } = req.params;
  if (!book_id || !user_id || !loan_date) {
    return res.status(400).json({ error: 'book_id, user_id, and loan_date are required' });
  }
  db.query(
    'UPDATE loans SET book_id = ?, user_id = ?, loan_date = ?, return_date = ? WHERE id = ?',
    [book_id, user_id, loan_date, return_date, id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Loan Updated', id, book_id, user_id, loan_date, return_date });
      }
    }
  );
});

// Delete a loan
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM loans WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Loan Deleted', id });
    }
  });
});

module.exports = router;
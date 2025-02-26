const db = require('../config/database.js');

const getindex = (callback) => {
    const SQLQuery = 'SELECT * FROM book';
    db.query(SQLQuery, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

const getByid = (id, callback) => {
    const SQLQuery = 'SELECT * FROM book WHERE id = ?';
    db.query(SQLQuery, [id], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
};

const createnew = (body, callback) => {
    const SQLQuery = `INSERT INTO book (title, writer, publisher, year, user_id, category_id) 
                      VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(SQLQuery, [
        body.title, body.writer, body.publisher, body.year, body.user_id, body.category_id
    ], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.insertId);
    });
};

const updateBook = (id, body, callback) => {
    const SQLQuery = `UPDATE book 
                      SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? 
                      WHERE id = ?`;
    db.query(SQLQuery, [
        body.title, body.writer, body.publisher, body.year, body.user_id, body.category_id, id
    ], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

const deleteBook = (id, callback) => {
    const SQLQuery = 'DELETE FROM book WHERE id = ?';
    db.query(SQLQuery, [id], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

module.exports = {
    getindex,
    getByid,
    createnew,
    updateBook,
    deleteBook
};

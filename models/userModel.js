const db = require('../config/database');

const User = {
    getAllUsers: (callback) => {
        const sql = 'SELECT * FROM users';
        db.query(sql, callback);
    },

    createUser: (username, password, name, email, phone, callback) => {
        const sql = 'INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [username, password, name, email, phone], callback);
    },
};

module.exports = User;
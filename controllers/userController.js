const User = require('../models/userModel.js');

// GET all users
const getAllUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// CREATE user
const createUser = (req, res) => {
    const { username, password, name, email, phone } = req.body;
    User.createUser(username, password, name, email, phone, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'User created successfully', userId: result.insertId });
    });
};

module.exports = { getAllUsers,createUser};
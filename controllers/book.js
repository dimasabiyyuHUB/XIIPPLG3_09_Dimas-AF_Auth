const Bookmodel = require('../models/book.js');

const getindex = (req, res) => {
    Bookmodel.getindex((err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: err.message,
            });
            return;
        }
        res.json({
            message: 'GET all books success',
            data: data
        });
    });
};

const getByid = (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ message: "ID tidak ditemukan dalam request" });
    }

    Bookmodel.getByid(id, (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: err.message
            });
            return;
        }
        if (data.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({
            message: 'GET book by ID success',
            data: data[0]
        });
    });
};

const createnew = (req, res) => {
    const { body } = req;

    if (!body.title || !body.writer || !body.publisher || !body.year || !body.user_id || !body.category_id) {
        return res.status(400).json({
            message: "Bad Request: Semua data harus diisi!"
        });
    }

    Bookmodel.createnew(body, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: err.message,
            });
            return;
        }
        res.status(201).json({
            message: 'CREATE new book success',
            data: { id: result, ...body }
        });
    });
};

const updateBook = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if (!body.title || !body.writer || !body.publisher || !body.year || !body.user_id || !body.category_id) {
        return res.status(400).json({
            message: "Bad Request: Semua data harus diisi!"
        });
    }

    Bookmodel.updateBook(id, body, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: err.message,
            });
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Book dengan ID ${id} tidak ditemukan`
            });
        }

        res.json({
            message: `Book dengan ID ${id} berhasil diperbarui`,
            data: { id, ...body }
        });
    });
};

const deleteBook = (req, res) => {
    const { id } = req.params;

    Bookmodel.deleteBook(id, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: err.message,
            });
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `Book dengan ID ${id} tidak ditemukan`
            });
        }

        res.json({
            message: `Book dengan ID ${id} berhasil dihapus`
        });
    });
};

module.exports = {
    getindex,
    getByid,
    createnew,
    updateBook,
    deleteBook
};

const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book')


router.get('/book', bookController.getindex)

router.get('/book/:id', bookController.getByid)

 router.post('/book', bookController.createnew)

router.put('/book/:id',bookController.updateBook )

 router.delete('/book/:id', bookController.deleteBook )

  module.exports = router
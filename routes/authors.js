const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.js');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;
// routes/books.js

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.js');
const { ensureAuth } = require('../middleware/authenticate'); // Import middleware

router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// Apply middleware to protected routes
router.post('/', ensureAuth, booksController.createBook);
router.put('/:id', ensureAuth, booksController.updateBook);
router.delete('/:id', ensureAuth, booksController.deleteBook);

module.exports = router;
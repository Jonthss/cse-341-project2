// routes/authors.js

const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors.js');
const { ensureAuth } = require('../middleware/authenticate'); // Import middleware

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getSingle);

// Apply middleware to protected routes
router.post('/', ensureAuth, authorsController.createAuthor);
router.put('/:id', ensureAuth, authorsController.updateAuthor);
router.delete('/:id', ensureAuth, authorsController.deleteAuthor);

module.exports = router;
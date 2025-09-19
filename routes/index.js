const express = require('express');
const router = express.Router();

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));

module.exports = router;
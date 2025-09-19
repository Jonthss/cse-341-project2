const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET All
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('books').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET Single
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('books').find({ _id: userId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Book not found.' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Creates a new book
const createBook = async (req, res) => {
  try {
    // Data Validation
    if (!req.body.title || !req.body.author || !req.body.isbn) {
      return res.status(400).send({ message: 'Required fields (title, author, isbn) cannot be empty!' });
    }

    const book = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      publicationYear: req.body.publicationYear,
      pages: req.body.pages,
      genre: req.body.genre
    };
    const response = await mongodb.getDb().db().collection('books').insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while creating the book.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT - Updates an existing book
const updateBook = async (req, res) => {
  try {
    // Data Validation
    if (!req.body.title || !req.body.author || !req.body.isbn) {
      return res.status(400).send({ message: 'Required fields (title, author, isbn) cannot be empty!' });
    }

    const userId = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      publicationYear: req.body.publicationYear,
      pages: req.body.pages,
      genre: req.body.genre
    };
    const response = await mongodb.getDb().db().collection('books').replaceOne({ _id: userId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or data is the same.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Deletes a book
const deleteBook = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('books').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };
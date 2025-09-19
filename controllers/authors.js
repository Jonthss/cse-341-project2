const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET All
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('authors').find();
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
    const result = await mongodb.getDb().db().collection('authors').find({ _id: userId });
    result.toArray().then((lists) => {
      if (lists.length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      } else {
        res.status(404).json({ message: 'Author not found.' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Creates a new author
const createAuthor = async (req, res) => {
  try {
    // Data Validation
    if (!req.body.name || !req.body.birthYear) {
      return res.status(400).send({ message: 'Required fields (name, birthYear) cannot be empty!' });
    }

    const author = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };
    const response = await mongodb.getDb().db().collection('authors').insertOne(author);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occurred while creating the author.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT - Updates an existing author
const updateAuthor = async (req, res) => {
  try {
    // Data Validation
    if (!req.body.name || !req.body.birthYear) {
      return res.status(400).send({ message: 'Required fields (name, birthYear) cannot be empty!' });
    }
    
    const userId = new ObjectId(req.params.id);
    const author = {
      name: req.body.name,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };
    const response = await mongodb.getDb().db().collection('authors').replaceOne({ _id: userId }, author);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found or data is the same.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Deletes an author
const deleteAuthor = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('authors').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Author not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createAuthor, updateAuthor, deleteAuthor };
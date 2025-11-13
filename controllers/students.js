const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('students')
      .find()
      .toArray((err, lists) => {
        //error handling
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  try {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid student id to find a student.');
      return;
    }
    const studentId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('students')
      .find({ _id: studentId })
      .toArray((err, result) => {
        //error handling
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const createStudent = async (req, res) => {
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    age: req.body.age,
    gender: req.body.gender,
    grade_level: req.body.grade_level
  };
  try {
    const response = await mongodb.getDb().db().collection('students').insertOne(student);
    //error handling
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateStudent = async (req, res) => {
    //data validation for id param
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to update a student.');
    return;
  }
  const studentId = new ObjectId(req.params.id);
  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    age: req.body.age,
    gender: req.body.gender,
    grade_level: req.body.grade_level
  };
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
      .replaceOne({ _id: studentId }, student);
      //error handling
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const deleteStudent = async (req, res) => {
    //data validation for id param
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid student id to delete a student.');
    return;
  }
  const studentId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: studentId });
    //error handling
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the student.');
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createStudent,
  updateStudent,
  deleteStudent
};
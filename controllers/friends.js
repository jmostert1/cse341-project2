const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('friends')
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
      res.status(400).json('Must use a valid friend id to find a friend.');
      return;
    }
    const friendId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('friends')
      .find({ _id: friendId })
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

const createFriend = async (req, res) => {
    const friend = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const response = await mongodb.getDb().db().collection('friends').insertOne(friend);
        //error handling
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the friend.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const updateFriend = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid friend id to update a friend.');
        return;
    }
    const friendId = new ObjectId(req.params.id);
    const friend = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const response = await mongodb
            .getDb()
            .db()
            .collection('friends')
            .replaceOne({ _id: friendId }, friend);
        //error handling
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the friend.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const deleteFriend = async (req, res) => {
    //data validation for id param
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid friend id to delete a friend.');
        return;
    }
    const friendId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().db().collection('friends').deleteOne({ _id: friendId });
        //error handling
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the friend.');
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

module.exports = {
    getAll,
    getSingle,
    createFriend,
    updateFriend,
    deleteFriend
};
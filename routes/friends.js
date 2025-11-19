const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const validation = require('../middleware/middleware');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', friendsController.getAll);
router.get('/:id', friendsController.getSingle);
router.post('/', isAuthenticated, validation.saveFriend, friendsController.createFriend);
router.put('/:id', isAuthenticated, validation.saveFriend, friendsController.updateFriend);
router.delete('/:id', isAuthenticated, friendsController.deleteFriend);

module.exports = router;
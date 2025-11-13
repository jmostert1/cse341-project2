const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const validation = require('../middleware/middleware');

router.get('/', friendsController.getAll);
router.get('/:id', friendsController.getSingle);
router.post('/', validation.saveFriend, friendsController.createFriend);
router.put('/:id', validation.saveFriend, friendsController.updateFriend);
router.delete('/:id', friendsController.deleteFriend);

module.exports = router;
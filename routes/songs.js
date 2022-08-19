var express = require('express');
var router = express.Router();
const songsController = require('../controllers/songs');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, songsController.index);
router.get('/new', songsController.new);
router.get('/:id', songsController.show);
router.post('/', songsController.create);

router.delete('/:id', songsController.delete);
router.get('/:id/edit', songsController.edit);
router.put('/:id/update', songsController.update);

module.exports = router;
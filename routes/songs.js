const express = require('express');
const router = express.Router();
const songCtrl = require('../controllers/songs');
const isLoggedIn = require('../config/auth');

router.get('/', songCtrl.index);
router.get('/new', isLoggedIn, songCtrl.newSong);
router.post('/', isLoggedIn, songCtrl.create);
router.get('/:id', songCtrl.show);
router.delete('/:id', isLoggedIn, songCtrl.deleteSong);
router.get('/:id/edit', songCtrl.edit);
router.put('/:id', songCtrl.update);

module.exports = router;
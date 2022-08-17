var express = require('express');
var router = express.Router();
const songController = require('../controllers/songs');
const isLoggedIn = require('../config/auth')
/* GET users listing. */
// /songs/new
router.get('/', songController.index);
router.get('/new', isLoggedIn, songController.new);
// /songs
router.get('/:id', songController.show);
router.post('/', isLoggedIn, songController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const videoCtrl = require('../controllers/videos');

router.post('/ysbpsongs/:id/videos', videoCtrl.create);

module.exports = router;
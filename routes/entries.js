const express = require('express');
const router = express.Router();
const entryCtrl = require('../controllers/entries');
const isLoggedIn = require('../config/auth');

router.post('/ysbpsongs/:id/entries', isLoggedIn, entryCtrl.create);
router.delete('/entries/:id', isLoggedIn, entryCtrl.deleteEntry);

module.exports = router;
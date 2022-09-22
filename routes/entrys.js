const express = require('express');
const router = express.Router();
const entryCtrl = require('../controllers/entrys');
const isLoggedIn = require('../config/auth');

router.post('/ysbpsongs/:id/entrys', isLoggedIn, entryCtrl.create);
router.delete('/entrys/:id', isLoggedIn, entryCtrl.deleteEntry);

module.exports = router;
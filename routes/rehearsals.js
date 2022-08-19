const express = require('express');
const router = express.Router();
const rehearsalsController = require('../controllers/rehearsals');

router.post('/songs/:id/rehearsals', rehearsalsController.create);

module.exports = router;
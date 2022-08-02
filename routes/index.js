const express = require('express');
const questionRoute = require('./questionRoute');

const router = express.Router();

//* question route
router.use('/question', questionRoute);

module.exports = router;
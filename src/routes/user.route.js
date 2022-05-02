const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

router.use(cors(corsOptions));

const signup_controller = require('../controllers/auth.controller.js');

router.post('/signup',signup_controller.signup);
router.post('/signin',signup_controller.signin);
module.exports = router;


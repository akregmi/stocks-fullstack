const express = require('express');
const { signIn, signUp } = require('../controllers/authController');
const { signUpValidator, validResult, userAlreadyExists } = require('../utils/authValidator');
const router = express.Router();

router.post('/login', signIn);
router.post('/signup', signUpValidator, validResult, userAlreadyExists, signUp);

module.exports = router;
const express = require('express');
const { getUser, updateUser } = require('../controllers/userController');
const { validSession } = require('../utils/authValidator');

const router = express.Router();

router
    .route('/')
    .post(validSession, updateUser)
    .get(validSession, getUser);

module.exports = router;
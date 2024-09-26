const express = require('express');
const { getTransaction, createTransaction } = require('../controllers/transactionController');
const router = express.Router();

router.get('/:id', getTransaction);
router.post('/', createTransaction);

module.exports = router;
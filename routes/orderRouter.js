const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/pointpay', orderController.payByPoint);

module.exports = {
  router,
};

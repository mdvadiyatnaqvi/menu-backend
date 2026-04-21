const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/chat.controller');
const {
  validateChatMessage,
  handleValidationErrors,
} = require('../middleware/validation');
const { chatLimiter } = require('../middleware/rateLimiter');

router.post('/', chatLimiter, validateChatMessage, handleValidationErrors, sendMessage);

module.exports = router;

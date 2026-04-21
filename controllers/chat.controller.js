const { getMenuResponse } = require('../services/openai.service');
const logger = require('../config/logger');

/**
 * POST /api/chat
 * Send a message and receive an AI menu response (stateless, no DB).
 */
async function sendMessage(req, res, next) {
  try {
    const { message } = req.body;

    // Stateless: no conversation history or persistence
    const history = [];

    // Call Gemini AI service
    const { content, restaurantName, location } = await getMenuResponse(message, history);

    return res.json({
      success: true,
      data: {
        response: content,
        restaurantName,
        location,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendMessage };

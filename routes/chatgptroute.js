const express = require('express');
const router = express.Router();
const { getChatGPTResponse } = require('../components/ChatGpt');

router.get('/trending-chat', async (req, res) => {
    try {
        const chatResponses = await getChatGPTResponse();
        
        if (chatResponses && chatResponses.length > 0) {
            res.json({
                success: true,
                data: chatResponses, // Array of { topic, response }
                message: 'Successfully fetched ChatGPT responses for trending topics'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'No responses received from ChatGPT',
                message: 'Failed to fetch ChatGPT responses'
            });
        }
    } catch (error) {
        console.error('Route error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error while fetching ChatGPT responses'
        });
    }
});

module.exports = router;
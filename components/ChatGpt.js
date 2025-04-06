const axios = require('axios');
const { fetchTrendingTopics } = require('./FetchTopics'); // Ensure this matches your file name

async function getChatGPTResponse() {
    // Fetch the trending topics
    const topics = await fetchTrendingTopics();
    
    // If no topics, return a default response
    if (!topics || topics.length === 0) {
        return [{
            topic: "No topics available",
            response: "No trending topics available at the moment."
        }];
    }

    const url = 'https://free-chatgpt-api.p.rapidapi.com/chat-completion-one';
    const responses = [];
    const topic = topics[0]; // Take only the first topic
    const prompt = `Hello! Please provide a brief summary about this current trending topic: ${topic.title}`;

    try {
        const config = {
            method: 'GET',
            url: url,
            params: { prompt: prompt },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY || 'MISSING_API_KEY',
                'x-rapidapi-host': 'free-chatgpt-api.p.rapidapi.com'
            }
        };

        console.log(`Sending request for ${topic.title} with prompt:`, prompt);
        const response = await axios(config);
        console.log(`ChatGPT Response for ${topic.title}:`, response.data);
        responses.push({
            topic: topic.title,
            response: response.data
        });

    } catch (error) {
        console.error(`Error for ${topic.title}:`, error.message);
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Response data:`, error.response.data);
        }
        responses.push({
            topic: topic.title,
            response: `Error: ${error.message}${error.response ? ` (Status: ${error.response.status})` : ''}`
        });
    }

    return responses; // Return array with single response
}

module.exports = { getChatGPTResponse };
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const trendingChatRouter = require('./routes/chatgptroute'); // Verify this path
const { fetchTrendingTopics } = require('./components/FetchTopics'); // Added missing import

const app = express();
app.use(cors());
app.use(express.json());

// Existing trending topics route
app.get("/trending-topics", async (req, res) => {
    const topics = await fetchTrendingTopics();
    if (topics.length > 0) {
        res.json({ topics });
    } else {
        res.status(500).json({ error: "Failed to fetch trending topics" });
    }
});

// Add the new trending chat route
app.use('/api', trendingChatRouter); // This should work with the router instance

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
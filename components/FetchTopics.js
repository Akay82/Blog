const axios = require("axios");

async function fetchTrendingTopics() {
    try {
        const response = await axios.get("https://serpapi.com/search.json", {
            params: {
                engine: "google_trends_trending_now",
                geo: "US",
                api_key: process.env.SERPAPI_KEY,
            },
        });

        console.log("Full API Response:", response.data); // Log full response
        
        const trends = response.data.trending_searches || []; // Extract trends safely
        console.log("Extracted Trends:", trends); // Debug extracted trends
        
        const topTopics = trends.slice(0, 5).map((t) => ({
            title: t.query, // Main trending query
            search_volume: t.search_volume, // Search volume
            increase_percentage: t.increase_percentage, // Percentage increase
            categories: t.categories.map((c) => c.name), // Category names
            related_queries: t.trend_breakdown.slice(0, 5), // Top 5 related searches
            google_trends_link: t.serpapi_google_trends_link // Link to trends
        }));

        console.log("Top Topics:", topTopics); // Debug final output
        
        return topTopics;
    } catch (error) {
        console.error("Error fetching trends:", error.message);
        return [];
    }
}

module.exports = { fetchTrendingTopics };
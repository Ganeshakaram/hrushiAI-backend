require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Load Gemini API
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const result = await model.generateContent(question);
    const geminiResponse = await result.response;
    const data = await geminiResponse.json(); // ✅ Parse the actual model output

    res.json(data); // ✅ Send proper JSON to frontend
  } catch (error) {
    if (error.response) {
      console.error("Google API error status:", error.response.status);
      console.error("Google API error data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from Google API:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

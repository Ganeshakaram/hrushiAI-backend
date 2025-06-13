require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();


const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;
    const result = await model.generateContent(question);
    const geminiResponse = await result.response;
    const data = await geminiResponse.json(); // ✅ Parse response as JSON

    res.json(data); // ✅ Send JSON to frontend
  } catch (error) {
    console.error("❌ Backend error:", error);
    res.status(500).json({ error: "Failed to get response from Gemini API" });
  }
});
  } catch (error) {
    if (error.response) {
      console.error("Google API error status:", error.response.status);
      console.error("Google API error data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from Google API:", error.request);
    } else {
      console.error("Error in setting up request:", error.message);
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

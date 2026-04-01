import express from "express";
import axios from "axios";

const recommendRouter = express.Router();

// POST /api/recommend
recommendRouter.post("/", async (req, res) => {
  try {
    const { watched } = req.body;

    if (!watched || !Array.isArray(watched)) {
      return res.status(400).json({
        success: false,
        message: "watched must be an array",
      });
    }

    // 🔥 Call Flask API
    const response = await axios.post("http://127.0.0.1:5000/recommend", {
      watched,
    });

    // Send back to frontend
    return res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error("Error calling ML service:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
    });
  }
});

export default recommendRouter;
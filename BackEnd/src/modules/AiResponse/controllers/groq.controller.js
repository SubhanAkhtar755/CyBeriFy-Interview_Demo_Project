import Groq from "groq-sdk";
import ResponseApiUser from "../models/responseApiUser.model.js";

// Send message & save reply
export const askGroq = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // FAKE REPLY FOR "hi"
    if (message.trim().toLowerCase() === "hi") {
      const fakeReply = "Hello! How can I help you today?";
      if (userId) {
        await ResponseApiUser.create({
          userId,
          question: message,
          answer: fakeReply,
        });
      }
      return res.json({ reply: fakeReply });
    }

    // REAL GROQ API
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    let reply = "";
    try {
      const groqRes = await client.chat.completions.create({
        model: "",
        messages: [{ role: "user", content: message }],
      });
 
      reply =
        groqRes?.choices?.[0]?.message?.content ||
        "No response received from model";
    } catch (apiError) {
      reply = "Groq API Error: " + apiError.message;
    }

    // SAVE IN DB
    if (userId) {
      await ResponseApiUser.create({
        userId,
        question: message,
        answer: reply,
      });
    }

    return res.json({ reply });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", reply: error.message });
  }
};


export const getUserMessages = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const messages = await ResponseApiUser.find({ userId }).sort({ createdAt: 1 });

    // Convert DB format → frontend chat format
    let chat = [];

    messages.forEach((m) => {
      // User message
      chat.push({
        text: m.question,
        sender: "user",
      });

      // Bot reply
      chat.push({
        text: m.answer,
        sender: "bot",
      });
    });

    res.json(chat);

  } catch (error) {
    console.error("Error fetching user messages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

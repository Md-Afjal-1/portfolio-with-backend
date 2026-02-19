const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const OpenAI = require("openai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Static files serve karega (public folder)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// ================= EMAIL ROUTE =================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.TO_EMAIL,
      subject: `Message from ${name}`,
      text: message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});


// ================= AI CHAT ROUTE =================
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional AI assistant on Afjal's portfolio website."
        },
        {
          role: "user",
          content: userMessage
        }
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "AI error" });
  }
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

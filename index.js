// index.js
const express = require("express");
const app = express();

app.use(express.json());

// GET /webhook – за валидация от Meta
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook GET request:", { mode, token, challenge });

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    return res.status(200).send(challenge);
  } else {
    console.log("Webhook verification failed:", { mode, token });
    return res.sendStatus(403);
  }
});

// POST /webhook – тук ще идват реалните събития от WhatsApp
app.post("/webhook", (req, res) => {
  console.log("Incoming webhook event:", JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

// ЗАДЪЛЖИТЕЛНО: експортираме express app за Vercel
module.exports = app;

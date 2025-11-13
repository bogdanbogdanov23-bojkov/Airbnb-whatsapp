import express from "express";

const app = express();
app.use(express.json());

// VERIFY WEBHOOK
app.get("/webhook", (req, res) => {
  const verifyToken = "my-airbnb-token";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verifyToken) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// RECEIVE MESSAGES
app.post("/webhook", (req, res) => {
  console.log("New message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// SERVER FOR LOCAL TEST (will be ignored on Vercel)
app.listen(3000, () => console.log("Webhook is running"));

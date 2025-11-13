// index.js
const express = require('express');
const app = express();
app.use(express.json());

// Верифициране на webhook-а (GET /webhook)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('Verification request:', { mode, token, challenge });

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return res.status(200).send(challenge);
  } else {
    console.log('Webhook verification failed');
    return res.status(403).send('Verification failed');
  }
});

// Получаване на събития от WhatsApp (POST /webhook)
app.post('/webhook', (req, res) => {
  console.log('Incoming webhook event:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Default route – за да не дава Cannot GET /
app.get('/', (req, res) => {
  res.send('WhatsApp webhook server is running');
});

// Vercel очаква да export-нем app
module.exports = app;

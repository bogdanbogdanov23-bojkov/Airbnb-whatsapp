// api/webhook.js

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Проверка на токена
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('Webhook verification failed', { mode, token });
      res.status(403).send('Verification failed');
    }
  } else if (req.method === 'POST') {
    // Тук ще получаваме събития от WhatsApp
    console.log('Incoming webhook event:', JSON.stringify(req.body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

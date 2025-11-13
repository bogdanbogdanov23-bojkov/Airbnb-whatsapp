// api/webhook.js

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Параметрите, които Meta праща при VERIFY
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('Webhook GET request:', { mode, token, challenge });

    // Проверка на verify token-а
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('Webhook verified successfully');
      return res.status(200).send(challenge);
    } else {
      console.log('Webhook verification failed', {
        mode,
        token,
        expected: process.env.VERIFY_TOKEN,
      });
      return res.sendStatus(403);
    }
  } else if (req.method === 'POST') {
    // Тук получаваме реалните събития от WhatsApp
    console.log(
      'Incoming webhook event:',
      JSON.stringify(req.body, null, 2)
    );
    return res.sendStatus(200);
  } else {
    // Ако някой удари с друг метод (PUT, DELETE и т.н.)
    return res.sendStatus(405);
  }
};

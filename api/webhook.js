// api/webhook.js

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      console.log('Incoming GET verify request:', { mode, token, challenge });

      if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
        console.log('✅ Webhook verified successfully');
        res.status(200).send(challenge);
      } else {
        console.log('❌ Webhook verification failed', { mode, token });
        res.status(403).send('Verification failed');
      }
    } else if (req.method === 'POST') {
      console.log('📩 Incoming webhook event:', JSON.stringify(req.body, null, 2));
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (err) {
    console.error('💥 Error inside webhook handler:', err);
    res.status(500).send('Internal server error');
  }
}

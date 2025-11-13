export default function handler(req, res) {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (req.method === "GET") {
    // Верификация от Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verifyToken) {
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    // Тук идват всички съобщения от WhatsApp
    console.log("Incoming message:", JSON.stringify(req.body, null, 2));
    return res.sendStatus(200);
  }

  return res.status(405).end(); // Method not allowed
}

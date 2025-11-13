export default function handler(req, res) {
  if (req.method === "GET") {
    // Верификация от Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      // Всичко е наред -> връщаме challenge
      return res.status(200).send(challenge);
    } else {
      // Грешен токен
      return res.status(403).send("Verification failed");
    }
  }

  if (req.method === "POST") {
    // Тук ще идват съобщенията от WhatsApp
    console.log("Webhook event:", JSON.stringify(req.body, null, 2));
    // Важно: винаги връщаме 200, за да е доволен WhatsApp
    return res.status(200).send("EVENT_RECEIVED");
  }

  // Ако е друг метод
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

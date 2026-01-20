export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { request_name, status, status_code, time } = req.body;

  // ✅ CHỈ gửi Telegram khi FAIL
  if (status !== "FAIL") {
    return res.status(200).json({ ignored: true });
  }

  const message =
`🚨 *API FAILED*
🔹 Request: ${request_name}
🔸 Status Code: ${status_code}
⏰ Time: ${time}`;

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  });

  return res.status(200).json({ sent: true });
}

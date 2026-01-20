export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const body = req.body;

  const monitorName = body?.name || "Postman Monitor";
  const stats = body?.run?.stats;

  let message = `📡 *${monitorName}*\n\n`;

  if (stats?.assertions) {
    message += `✅ Passed: ${stats.assertions.passed}\n`;
    message += `❌ Failed: ${stats.assertions.failed}\n`;
  } else {
    message += "⚠️ No assertion data";
  }

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  });

  return res.status(200).json({ ok: true });
}

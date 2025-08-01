export default function handler(req, res) {
  console.log("🚀 Hello API called!");
  console.log("📝 Method:", req.method);
  console.log("📝 URL:", req.url);
  console.log("📝 Headers:", req.headers);

  res.status(200).json({
    message: "Hello from Vercel API!",
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
  });
}

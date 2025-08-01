export default async function handler(req, res) {
  console.log("🔍 Proxy API called:", req.method, req.url);
  console.log("🔍 Query params:", req.query);
  console.log("🔍 Headers:", req.headers);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.status(200).end();
    return;
  }

  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    // Get the path from the request URL
    const { path } = req.query;

    console.log("🔍 Requested path:", path);

    if (!path) {
      console.log("❌ No path provided");
      return res.status(400).json({ error: "Path parameter is required" });
    }

    // Construct the target URL
    const targetUrl = `https://publish-p92368-e968987.adobeaemcloud.com${path}`;
    console.log("🔍 Target URL:", targetUrl);

    // Forward the request to the Adobe AEM server
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...req.headers,
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    console.log("🔍 AEM Response status:", response.status);
    console.log("🔍 AEM Response headers:", response.headers);

    // Get the response data
    const data = await response.json();
    console.log("🔍 AEM Response data keys:", Object.keys(data || {}));

    // Forward the response status and data
    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: error.message,
      stack: error.stack 
    });
  }
}

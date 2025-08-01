const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`📥 Incoming request: ${req.method} ${req.url}`);
  next();
});

// Proxy middleware configuration
const proxyOptions = {
  target: "https://publish-p92368-e968987.adobeaemcloud.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Remove /api prefix when forwarding
  },
  onProxyReq: function (proxyReq, req, res) {
    console.log(`🔄 Proxying request to: ${proxyReq.path}`);
  },
  onProxyRes: function (proxyRes, req, res) {
    console.log(`📡 Proxy response status: ${proxyRes.statusCode}`);
    // Add CORS headers to the response
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    proxyRes.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    proxyRes.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization";
  },
  onError: function (err, req, res) {
    console.error("❌ Proxy error:", err.message);
    res.status(500).json({ error: "Proxy error", message: err.message });
  },
};

// Use proxy for all /api routes
app.use("/api", createProxyMiddleware(proxyOptions));

// Add a test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Proxy server is working!" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(
    "🎯 Proxying requests to: https://publish-p92368-e968987.adobeaemcloud.com"
  );
  console.log("🧪 Test endpoint: http://localhost:3001/test");
});

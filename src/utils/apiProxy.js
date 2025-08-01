// Utility function to make API calls through the proxy
export const proxyApiCall = async (path, options = {}) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // In development, use the local proxy server
  // In production, use the Vercel API route
  const baseUrl = isDevelopment
    ? "http://localhost:3001/api"
    : `${window.location.origin}/api/proxy`;

  const url = isDevelopment
    ? `${baseUrl}${path}`
    : `${baseUrl}?path=${encodeURIComponent(path)}`;

  console.log(`🔗 Making API call to: ${url}`);
  console.log(
    `🌍 Environment: ${isDevelopment ? "Development" : "Production"}`
  );

  const defaultOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);

    console.log(`📡 Response status: ${response.status}`);
    console.log(`📡 Response headers:`, response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ API call successful for path: ${path}`);
    console.log(`📦 Response data type:`, typeof data);
    console.log(`📦 Response data keys:`, Object.keys(data || {}));

    return data;
  } catch (error) {
    console.error("❌ API call failed:", error);
    console.error("❌ Failed URL:", url);
    throw error;
  }
};

// Specific function for Adobe AEM content
export const fetchAEMContent = async (path) => {
  console.log(`🎯 Fetching AEM content for path: ${path}`);
  return proxyApiCall(path);
};

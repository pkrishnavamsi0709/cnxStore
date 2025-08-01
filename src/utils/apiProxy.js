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
      // If the API route is not working, return fallback content
      if (response.status === 404) {
        console.log("⚠️ API route not found, using fallback content");
        return getFallbackContent(path);
      }
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
    
    // Return fallback content on any error
    console.log("⚠️ Using fallback content due to API error");
    return getFallbackContent(path);
  }
};

// Fallback content when Adobe AEM is not available
const getFallbackContent = (path) => {
  console.log("🔄 Providing fallback content for path:", path);
  
  // Return appropriate fallback content based on the path
  if (path.includes("home-page")) {
    return {
      ":items": {
        root: {
          ":items": {
            container: {
              ":items": {
                container: {
                  ":items": {
                    "title_411834077": {
                      text: "Welcome to CNX Store"
                    },
                    "text_99934174": {
                      text: "Experience the better shopping experience with our exclusive offers and premium products."
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }
  
  if (path.includes("offers-page")) {
    return {
      ":items": {
        root: {
          ":items": {
            container: {
              ":items": {
                container: {
                  ":items": {
                    "title_411834077": {
                      text: "Get Exclusive Offers!"
                    },
                    "text_99934174": {
                      text: "Subscribe to our newsletter and never miss a deal"
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }
  
  // Default fallback
  return {
    ":items": {
      root: {
        ":items": {
          container: {
            ":items": {
              container: {
                ":items": {
                  "title_411834077": {
                    text: "CNX Store"
                  },
                  "text_99934174": {
                    text: "Your trusted shopping destination"
                  }
                }
              }
            }
          }
        }
      }
    }
  };
};

// Specific function for Adobe AEM content
export const fetchAEMContent = async (path) => {
  console.log(`🎯 Fetching AEM content for path: ${path}`);
  return proxyApiCall(path);
};

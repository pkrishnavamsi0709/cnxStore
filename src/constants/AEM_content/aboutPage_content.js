// useAboutPageContent.js
import { useEffect, useState } from "react";

const useAboutPageContent = () => {
  const [aboutData, setAboutData] = useState({
    "Welcome-text": null,
    "Welcome-description": null,
    "Welcome-content": null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const getWelcomeContent = async () => {
      try {
        setAboutData(prev => ({ ...prev, loading: true, error: null }));
        
        const response = await fetch("https://publish-p92368-e968987.adobeaemcloud.com/content/concentrixpartnersandboxprogram/us/en/about-page.model.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const result = {};
        const targetIds = ['Welcome-text', 'Welcome-description', 'Welcome-content'];
        
        function findById(obj) {
          if (!obj || typeof obj !== 'object') return;
          
          if (obj.id && targetIds.includes(obj.id)) {
            result[obj.id] = obj.text || obj.value || obj.content || obj;
          }
          
          Object.values(obj).forEach(value => {
            if (typeof value === 'object') findById(value);
          });
        }
        
        findById(data);
        
        const output = {
          "Welcome-text": result["Welcome-text"] || null,
          "Welcome-description": result["Welcome-description"] || null,
          "Welcome-content": result["Welcome-content"] || null,
          loading: false,
          error: null
        };
        
        setAboutData(output);
        console.log("Fetched content:", JSON.stringify(output, null, 2));
        
      } catch (error) {
        console.error("Error fetching content:", error);
        setAboutData({
          "Welcome-text": null,
          "Welcome-description": null,
          "Welcome-content": null,
          loading: false,
          error: error.message
        });
      }
    };

    getWelcomeContent();
  }, []);

  return aboutData;
};

export default useAboutPageContent;
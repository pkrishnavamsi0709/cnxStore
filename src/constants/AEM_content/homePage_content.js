import { useEffect, useState } from "react";
import { fetchAEMContent } from "../../utils/apiProxy";

const useHomePageContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomePageData = async () => {
    const path =
      "/content/test-site/en/Home.model.json";

    try {
      setLoading(true);
      const data = await fetchAEMContent(path);

      // Console log the raw data from Adobe AEM
      console.log("🏠 Home Page Data from Adobe AEM:", data);
      console.log(
        "📊 Home Page Data Structure:",
        JSON.stringify(data, null, 2)
      );

      setPageData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching home page:", error);
      setError("Failed to load home page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageData();
    // eslint-disable-next-line
  }, []);

  return { pageData, loading, error, refetch: fetchHomePageData };
};

export default useHomePageContent;

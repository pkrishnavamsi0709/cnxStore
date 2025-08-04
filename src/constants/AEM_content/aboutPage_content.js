import { useEffect, useState } from "react";
import { fetchAEMContent } from "../../utils/apiProxy";

const useAboutPageContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAboutPageData = async () => {
    const path =
      "/api/content/test-site/en/Home.model.json";

    try {
      setLoading(true);
      const data = await fetchAEMContent(path);

      // Console log the raw data from Adobe AEM
      console.log("ℹ️ About Page Data from Adobe AEM:", data);
      console.log(
        "📊 About Page Data Structure:",
        JSON.stringify(data, null, 2)
      );

      setPageData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching about page:", error);
      setError("Failed to load page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutPageData();
    // eslint-disable-next-line
  }, []);

  return { pageData, loading, error, refetch: fetchAboutPageData };
};

export default useAboutPageContent;

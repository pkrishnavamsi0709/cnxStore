import { useEffect, useState } from "react";
import { fetchAEMContent } from "../../utils/apiProxy";

const useOffersPageContent = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOffersPageData = async () => {
    const path =
      "/content/concentrixpartnersandboxprogram/us/en/offers-page.model.json";

    try {
      setLoading(true);
      const data = await fetchAEMContent(path);

      // Console log the raw data from Adobe AEM
      console.log("🎁 Offers Page Data from Adobe AEM:", data);
      console.log(
        "📊 Offers Page Data Structure:",
        JSON.stringify(data, null, 2)
      );

      setPageData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching offers page:", error);
      setError("Failed to load offers page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersPageData();
    // eslint-disable-next-line
  }, []);

  return { pageData, loading, error, refetch: fetchOffersPageData };
};

// Place this in Offers.js or a utils file
// function extractOffersPageTexts(pageData) {
//   try {
//     // Adjust the path as per your AEM structure
//     const items =
//       pageData?.[":items"]?.root?.[":items"]?.container?.[":items"]
//         ?.container?.[":items"];
//     return {
//       getExclusiveOffers:
//         items?.["title_411834077"]?.text?.trim() || "Get Exclusive Offers!",
//       exclusiveOffers:
//         items?.["text_99934174"]?.text
//           ?.replace(/<[^>]+>/g, "")
//           .replace(/\r?\n|\r/g, "")
//           .trim() || "Subscribe to our newsletter and never miss a deal",
//     };
//   } catch {
//     return {
//       getExclusiveOffers: "Get Exclusive Offers!",
//       exclusiveOffers: "Subscribe to our newsletter and never miss a deal",
//     };
//   }
// }

export default useOffersPageContent;

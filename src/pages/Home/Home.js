import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { loadpaginationItems, paginationItems } from "../../constants";
import useHomePageContent from "../../constants/AEM_content/homePage_content";
// import { VideosSection } from "../../components/home/VideosSection";

const Home = () => {
  const [products, setProducts] = React.useState([]);
  const { pageData, loading, error } = useHomePageContent();

  React.useEffect(() => {
    async function fetchProducts() {
      await loadpaginationItems();
      setProducts([...paginationItems]);
    }
    fetchProducts();
  }, []);

  // Log the Adobe AEM data
  React.useEffect(() => {
    if (pageData) {
      console.log("🏠 Home page data loaded from Adobe AEM:", pageData);
    }
    if (error) {
      console.error("❌ Home page error:", error);
    }
  }, [pageData, error]);

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      {/* <VideosSection /> */}
      <div className="max-w-container mx-auto px-4">
        {/* Display Adobe AEM content if available */}
        {loading && (
          <div className="text-center py-8">
            <p>Loading dynamic content from Adobe AEM...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">
            <p>Error loading dynamic content: {error}</p>
          </div>
        )}

        {pageData && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Dynamic Content from Adobe AEM
            </h2>
            <p>
              <strong>Title:</strong> {pageData.title}
            </p>
            <p>
              <strong>Type:</strong> {pageData[":type"]}
            </p>
            <p>
              <strong>Language:</strong> {pageData.language}
            </p>
            <details className="mt-4">
              <summary className="cursor-pointer font-medium">
                View Full Adobe AEM Data
              </summary>
              <pre className="mt-2 p-4 bg-white rounded text-sm overflow-auto">
                {JSON.stringify(pageData, null, 2)}
              </pre>
            </details>
          </div>
        )}

        <Sale />
        <NewArrivals products={products} />
        <BestSellers products={products} />
        <YearProduct />
        <SpecialOffers products={products} />
      </div>
    </div>
  );
};

export default Home;

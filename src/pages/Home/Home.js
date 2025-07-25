import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { loadpaginationItems, paginationItems } from "../../constants";
// import { VideosSection } from "../../components/home/VideosSection";

const Home = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    async function fetchProducts() {
      await loadpaginationItems();
      setProducts([...paginationItems]);
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      {/* <VideosSection /> */}
      <div className="max-w-container mx-auto px-4">
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

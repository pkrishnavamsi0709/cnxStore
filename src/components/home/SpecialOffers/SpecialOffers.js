import React from "react";
import Slider from "react-slick";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

function getUniqueRandomProducts(products, count) {
  const unique = [];
  const seen = new Set();
  for (const p of [...products].sort(() => 0.5 - Math.random())) {
    const key = p._id || p.productName;
    if (!seen.has(key)) {
      unique.push(p);
      seen.add(key);
    }
    if (unique.length === count) break;
  }
  return unique;
}

const SpecialOffers = ({ products = [] }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const offerProducts = getUniqueRandomProducts(products, 5);
  return (
    <div className="w-full pb-16">
      <Heading heading="Special Offers" />
      <Slider {...settings}>
        {offerProducts.map((product) => (
          <div className="px-2" key={product._id}>
            <Product {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialOffers;

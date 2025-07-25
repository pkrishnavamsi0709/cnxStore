import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = ({ products = [] }) => {
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
  // Filter products for category 'shoes' and make unique
  const shoesArrivals = [];
  const seen = new Set();
  for (const p of products) {
    if (p.category && p.category.toLowerCase() === "shoes") {
      const key = p._id || p.productName;
      if (!seen.has(key)) {
        shoesArrivals.push(p);
        seen.add(key);
      }
    }
    if (shoesArrivals.length === 5) break;
  }
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {shoesArrivals.map((product) => (
          <div className="px-2" key={product._id}>
            <Product {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;

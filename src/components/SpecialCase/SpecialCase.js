import React from "react";
import { MdSwitchAccount } from "react-icons/md";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const navigate = useNavigate();
  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      {/* Profile Button */}
      <div
        className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer"
        onClick={() => {
          if (sessionStorage.getItem("shopifyAccessToken")) {
            navigate("/profile");
          } else {
            navigate("/signin");
          }
        }}
      >
        <div className="flex justify-center items-center">
          <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
        </div>
        <p className="text-xs font-semibold font-titleFont">Profile</p>
      </div>
      {/* Cart Button */}
      <div
        onClick={() => navigate("/cart")}
        className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative"
      >
        <div className="flex justify-center items-center">
          <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
        </div>
        <p className="text-xs font-semibold font-titleFont">Buy Now</p>
        {products.length > 0 && (
          <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
            {products.length}
          </p>
        )}
      </div>
    </div>
  );
};

export default SpecialCase;

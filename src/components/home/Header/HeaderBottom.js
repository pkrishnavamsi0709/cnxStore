import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { paginationItems } from "../../../constants";
import Flex from "../../designLayouts/Flex";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = paginationItems.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>

            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Accessories
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Furniture
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Electronics
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Clothes
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Bags
                </li>
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
          {/* Custom CTA Search Bar */}
          <div
            className="relative w-full lg:w-[470px] h-[50px] flex items-center justify-between px-6 rounded-full border-2 border-blue-300 bg-gray-200 cursor-pointer shadow-lg group transition-all duration-200"
            onClick={() => window.dispatchEvent(new Event("openChatWidget"))}
          >
            <span className="text-blue-900 font-semibold text-base select-none ">
              Experience CNX STORE
            </span>
            <span className="flex items-center justify-center ml-3">
              {/* Voice/Waveform Icon SVG */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="white" />
                <rect x="8" y="10" width="2" height="8" rx="1" fill="#3A7BD5" />
                <rect
                  x="12"
                  y="7"
                  width="2"
                  height="14"
                  rx="1"
                  fill="#3A7BD5"
                />
                <rect
                  x="16"
                  y="11"
                  width="2"
                  height="6"
                  rx="1"
                  fill="#3A7BD5"
                />
                <rect
                  x="20"
                  y="13"
                  width="2"
                  height="2"
                  rx="1"
                  fill="#3A7BD5"
                />
              </svg>
            </span>
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div
              className="relative"
              onMouseEnter={() => setShowUser(true)}
              onMouseLeave={() => setShowUser(false)}
            >
              <div className="flex">
                <FaUser />
                <FaCaretDown />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-full left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  {sessionStorage.getItem("shopifyAccessToken") ? (
                    <>
                      <li
                        className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                        onClick={() => {
                          setShowUser(false);
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </li>
                      <li
                        className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
                        onClick={() => {
                          setShowUser(false);
                          sessionStorage.removeItem("shopifyAccessToken");
                          sessionStorage.removeItem("shopifyUser");
                          window.alert("Logout successful");
                          navigate("/signin");
                        }}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <Link to="/signin">
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                          Login
                        </li>
                      </Link>
                      <Link onClick={() => setShowUser(false)} to="/signup">
                        <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                          Sign Up
                        </li>
                      </Link>
                    </>
                  )}
                  <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Others
                  </li>
                </motion.ul>
              )}
            </div>
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;

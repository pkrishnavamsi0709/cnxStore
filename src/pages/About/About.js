import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [activeTab, setActiveTab] = useState("who-we-are");
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
    fetchAboutPageData();
  }, [location]);

  // Function to fetch data from Adobe AEM
  const fetchAboutPageData = async () => {
    const url =
      "http://localhost:3001/api/content/concentrixpartnersandboxprogram/us/en/about-page.model.json";

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPageData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching about page:", error);
      setError("Failed to load page content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to extract company information from the response
  const extractCompanyInfo = (data) => {
    try {
      const container =
        data[":items"]?.root?.[":items"]?.container?.[":items"]?.container?.[
          ":items"
        ];

      if (container) {
        const companyInfo = {};

        Object.keys(container).forEach((key) => {
          if (key.startsWith("text") && container[key].text) {
            const cleanText = container[key].text
              .replace(/<[^>]*>/g, "")
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&#x1f4cd;/g, "📍")
              .replace(/&#x1f3e2;/g, "🏢")
              .replace(/&#x1f465;/g, "👥")
              .replace(/&#x1f4de;/g, "📞")
              .replace(/&#39;/g, "'")
              .trim();

            companyInfo[key] = cleanText;
          }
        });

        return companyInfo;
      }

      return null;
    } catch (error) {
      console.error("Error extracting company info:", error);
      return null;
    }
  };

  // Get company info from fetched data
  const companyInfo = pageData ? extractCompanyInfo(pageData) : null;

  const tabs = [
    {
      id: "who-we-are",
      label: "Who We Are",
      content: {
        title: "Who We Are",
        description:
          companyInfo?.text ||
          "CnxClothing is a premier fashion destination that has been redefining style and elegance since our inception. We are passionate about bringing you the latest trends while maintaining timeless sophistication.",
        details: [
          "Founded with a vision to make fashion accessible to everyone",
          "A team of dedicated fashion enthusiasts and industry experts",
          "Committed to quality, style, and customer satisfaction",
          "Serving customers worldwide with premium clothing collections",
        ],
      },
    },
    {
      id: "what-we-do",
      label: "What We Do",
      content: {
        title: "What We Do",
        description:
          companyInfo?.text_165213283 ||
          "We curate and design exceptional clothing collections that blend contemporary fashion with classic elegance. Our mission is to empower individuals through style.",
        details: [
          "Design and manufacture high-quality clothing for all occasions",
          "Source premium materials from trusted suppliers globally",
          "Provide personalized styling advice and customer support",
          "Offer seamless online shopping experience with fast delivery",
        ],
      },
    },
    {
      id: "our-place",
      label: "Our Place",
      content: {
        title: "Our Place in Fashion",
        description:
          "We've established ourselves as a trusted name in the fashion industry, bridging the gap between luxury and accessibility while maintaining our commitment to excellence.",
        details: [
          "Recognized leader in contemporary fashion retail",
          "Strong presence in both online and offline markets",
          "Partnerships with renowned designers and brands",
          "Growing community of fashion-forward customers worldwide",
        ],
      },
    },
    {
      id: "our-impact",
      label: "Our Impact",
      content: {
        title: "Our Impact",
        description:
          "We believe in making a positive difference in the world through sustainable practices, ethical sourcing, and community engagement.",
        details: [
          "Committed to sustainable and eco-friendly manufacturing processes",
          "Supporting local artisans and fair trade practices",
          "Reducing environmental footprint through responsible packaging",
          "Contributing to community development and social causes",
        ],
      },
    },
  ];

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="About" prevLocation={prevLocation} />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primeColor mx-auto mb-4"></div>
            <p className="text-lightText">Loading page content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="About" prevLocation={prevLocation} />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchAboutPageData}
              className="bg-primeColor text-white px-6 py-2 rounded-md hover:bg-black transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />

      <div className="pb-10">
        {/* Header Section */}
        <div className="mb-8 bg-gray-50 p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h1 className="text-3xl font-bold text-primeColor mb-4 ">
                {companyInfo?.text ||
                  "Welcome to cnxStore – Style. Value. Trust."}

                {companyInfo?.text_1626935937 && (
                  <div className="text-sm text-gray-600 space-y-1 mb-4 mt-9">
                    <p>📍 Established: 2018</p>
                    <p>🏢 Headquarters: Gurugram, India</p>
                    <p>👥 Serving 2M+ Customers</p>
                    <p>📞 24/7 Support: 1800-123-4567</p>
                  </div>
                )}
              </h1>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4 text-lightText">
                <p>
                  {companyInfo?.text_165213283 ||
                    "At cnxStore, we're more than just an online shop – we're your fashion and lifestyle destination. Founded with a passion for quality, affordability, and inclusivity, cnxStore curates a diverse collection of clothing and lifestyle essentials that cater to every age, style, and occasion."}
                </p>
                <p>
                  Whether you're shopping for trendy women's wear, stylish men's
                  essentials, or adorable kids' outfits, cnxStore brings
                  together quality products, carefully handpicked from emerging
                  designers and trusted labels. Our goal? To make everyday
                  fashion and lifestyle products more accessible to everyone –
                  without compromising on design or durability.
                </p>
                <p>
                  We are constantly expanding, driven by our commitment to offer
                  a seamless shopping experience, speedy delivery, and a
                  customer-first approach. Join the cnxStore community today and
                  experience convenience, style, and service like never before.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Tabs Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Tab Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-6 py-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 hover:bg-gray-50 ${
                    activeTab === tab.id
                      ? "bg-primeColor text-white hover:bg-primeColor"
                      : "text-gray-700"
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Tab Content */}
          <div className="lg:w-3/4">
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm min-h-[400px]">
              {activeTabContent && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primeColor mb-4">
                    {activeTabContent.title}
                  </h2>

                  <p className="text-lg text-lightText leading-relaxed">
                    {activeTabContent.description}
                  </p>

                  <div className="space-y-3">
                    {activeTabContent.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primeColor rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-lightText">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-lightText mb-6">
            Ready to explore our collection? Start shopping now and discover
            your perfect style.
          </p>
          <Link to="/shop">
            <button className="bg-primeColor text-white px-8 py-3 rounded-md hover:bg-black transition-colors duration-300 font-medium">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

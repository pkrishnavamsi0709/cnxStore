import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import useAboutPageContent from "../../constants/AEM_content/aboutPage_content";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [activeTab, setActiveTab] = useState("who-we-are");
  const { pageData, loading, error } = useAboutPageContent();

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  // Log the Adobe AEM data
  useEffect(() => {
    if (pageData) {
      console.log("ℹ️ About page data loaded from Adobe AEM:", pageData);
    }
    if (error) {
      console.error("❌ About page error:", error);
    }
  }, [pageData, error]);

  const tabs = [
    {
      id: "who-we-are",
      label: "Who We Are",
      content: {
        title: "Who We Are",
        description:
          "CNX Store is a premier fashion destination that has been redefining style and elegance since our inception in 2018. We are passionate about bringing you the latest trends while maintaining timeless sophistication.",
        details: [
          "Founded with a vision to make fashion accessible to everyone since 2018",
          "A team of 500+ dedicated fashion enthusiasts and industry experts across India",
          "Committed to quality, style, and customer satisfaction with 96% retention rate",
          "Serving 2M+ customers worldwide with premium clothing collections from our 6 fulfillment centers",
        ],
      },
    },
    {
      id: "what-we-do",
      label: "What We Do",
      content: {
        title: "What We Do",
        description:
          "We curate and design exceptional clothing collections that blend contemporary fashion with classic elegance. Our mission is to empower individuals through style with technology-driven solutions.",
        details: [
          "Design and manufacture high-quality clothing for all occasions with AI-powered recommendations",
          "Source premium materials from 1000+ trusted suppliers globally",
          "Provide personalized styling advice through our 24/7 customer support at +91-11-4567-8900",
          "Offer seamless online shopping experience with same-day delivery in 50+ cities",
        ],
      },
    },
    {
      id: "our-place",
      label: "Our Place",
      content: {
        title: "Our Place in Fashion",
        description:
          "We've established ourselves as a trusted name in the fashion industry, bridging the gap between luxury and accessibility while maintaining our commitment to excellence from our Gurugram headquarters.",
        details: [
          "Recognized leader in contemporary fashion retail with presence in 4 major regions across India",
          "Strong presence in both online and offline markets with 3 experience centers",
          "Partnerships with 1000+ renowned designers and brands globally",
          "Growing community of 2M+ fashion-forward customers worldwide via @cnx_store social platforms",
        ],
      },
    },
    {
      id: "our-impact",
      label: "Our Impact",
      content: {
        title: "Our Impact",
        description:
          "We believe in making a positive difference in the world through sustainable practices, ethical sourcing, and community engagement, as highlighted in our press releases.",
        details: [
          "Committed to sustainable and eco-friendly manufacturing processes with 80% plastic waste reduction",
          "Supporting 1000+ local artisans and fair trade practices through our partnerships",
          "Reducing environmental footprint through responsible packaging and carbon-neutral operations",
          "Contributing to community development through CNX Store Foundation education initiatives reaching 10,000+ rural entrepreneurs",
        ],
      },
    },
    {
      id: "contact-info",
      label: "Contact & Locations",
      content: {
        title: "Contact & Locations",
        description:
          "Connect with us through multiple channels and visit our physical locations across India. We're here to serve you with excellence.",
        details: [
          "24/7 Customer Support: 1800-123-4567 (Toll-Free) | +91-11-4567-8900",
          "Corporate Headquarters: Plot No. 45, Sector 18, Cyber City, Gurugram - 122015",
          "4 Regional Offices: Delhi, Mumbai, Bangalore, Kolkata with full customer service",
          "6 Fulfillment Centers processing 50,000+ daily orders across India",
        ],
        isContact: true,
      },
    },
    {
      id: "business-info",
      label: "Business Information",
      content: {
        title: "Business Information",
        description:
          "CNX Store Private Limited is a registered company committed to transparency and legal compliance in all our operations.",
        details: [
          "Company: CNX Store Private Limited (Est. 2018)",
          "Registration: CIN-U52100DL2018PTC334567",
          "GST Number: 07AABCC1234M1Z5",
          "Business Hours: Customer Service 9AM-9PM, Technical Support 24/7",
        ],
        isBusiness: true,
      },
    },
  ];

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const contactInfo = [
    {
      icon: <FaPhone className="text-primeColor" />,
      title: "Customer Support",
      details: [
        "1800-123-4567 (Toll-Free)",
        "+91-11-4567-8900",
        "WhatsApp: +91-98765-43210",
      ],
    },
    {
      icon: <FaEnvelope className="text-primeColor" />,
      title: "Email Us",
      details: [
        "info@cnxstore.com",
        "support@cnxstore.com",
        "sales@cnxstore.com",
      ],
    },
    {
      icon: <FaMapMarkerAlt className="text-primeColor" />,
      title: "Visit Us",
      details: [
        "Corporate HQ: Gurugram",
        "Experience Centers: Delhi, Mumbai, Bangalore",
        "6 Fulfillment Centers Across India",
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://www.facebook.com/CNXStoreOfficial",
      name: "Facebook",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/cnx_store/",
      name: "Instagram",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com/CNXStore",
      name: "Twitter",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/cnx-store-private-limited",
      name: "LinkedIn",
    },
    {
      icon: <FaYoutube />,
      url: "https://www.youtube.com/@CNXStoreOfficial",
      name: "YouTube",
    },
  ];

  const regionalOffices = [
    {
      name: "North Region",
      location: "Connaught Place, New Delhi",
      phone: "011-4567-8900",
    },
    {
      name: "West Region",
      location: "Andheri East, Mumbai",
      phone: "022-6789-0123",
    },
    {
      name: "South Region",
      location: "UB City Mall, Bangalore",
      phone: "080-4567-8901",
    },
    {
      name: "East Region",
      location: "Salt Lake Sector V, Kolkata",
      phone: "033-2456-7890",
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />

      <div className="pb-10">
        {/* Adobe AEM Content Display */}
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
        {/* Header Section */}
        <div className="mb-8 bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h1 className="text-3xl font-bold text-primeColor mb-4">
                Welcome to CNX Store – Style. Value. Trust.
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📍 Established: 2018</p>
                <p>🏢 Headquarters: Gurugram, India</p>
                <p>👥 Serving 2M+ Customers</p>
                <p>📞 24/7 Support: 1800-123-4567</p>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="space-y-4 text-lightText">
                <p>
                  At CNX Store, we're more than just an online shop – we're your
                  fashion and lifestyle destination. Founded in 2018 with a
                  passion for quality, affordability, and inclusivity, CNX Store
                  curates a diverse collection of clothing and lifestyle
                  essentials that cater to every age, style, and occasion.
                </p>
                <p>
                  Whether you're shopping for trendy women's wear, stylish men's
                  essentials, or adorable kids' outfits, CNX Store brings
                  together quality products, carefully handpicked from emerging
                  designers and trusted labels. Our goal? To make everyday
                  fashion and lifestyle products more accessible to everyone –
                  without compromising on design or durability.
                </p>
                <p>
                  With our headquarters in Gurugram and regional presence across
                  India through 4 regional offices and 6 fulfillment centers, we
                  are constantly expanding, driven by our commitment to offer a
                  seamless shopping experience, speedy delivery, and a
                  customer-first approach. Join the CNX Store community today
                  and experience convenience, style, and service like never
                  before.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="mb-8 grid md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{info.icon}</div>
                <h3 className="font-semibold text-primeColor">{info.title}</h3>
              </div>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-lightText">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-primeColor mb-4">
            Follow Us on Social Media
          </h3>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primeColor hover:bg-primeColor hover:text-white transition-all duration-300"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-sm text-lightText mt-2">
            Stay updated with our latest collections, offers, and fashion
            trends!
          </p>
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

                  {/* Special Content for Contact Tab */}
                  {activeTabContent.isContact && (
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primeColor mb-3">
                          Regional Offices
                        </h4>
                        <div className="space-y-3">
                          {regionalOffices.map((office, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium">{office.name}</p>
                              <p className="text-lightText">
                                {office.location}
                              </p>
                              <p className="text-lightText">
                                📞 {office.phone}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primeColor mb-3">
                          Business Hours
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Customer Service:</span>
                            <span>9:00 AM - 9:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Technical Support:</span>
                            <span>24/7</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Phone Support:</span>
                            <span>10:00 AM - 7:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Office Hours:</span>
                            <span>9:30 AM - 6:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Special Content for Business Info Tab */}
                  {activeTabContent.isBusiness && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-primeColor mb-4">
                        Legal & Compliance
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Registered Office:</strong>
                          </p>
                          <p className="text-lightText">
                            Plot No. 45, Sector 18
                          </p>
                          <p className="text-lightText">Cyber City, Gurugram</p>
                          <p className="text-lightText">
                            Haryana - 122015, India
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Contact Information:</strong>
                          </p>
                          <p className="text-lightText">
                            📧 legal@cnxstore.com
                          </p>
                          <p className="text-lightText">
                            📧 compliance@cnxstore.com
                          </p>
                          <p className="text-lightText">📞 +91-11-2345-6794</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12 bg-primeColor text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            CNX Store by Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">2M+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm opacity-90">Brand Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold">96%</div>
              <div className="text-sm opacity-90">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-lightText mb-6">
            Ready to explore our collection? Start shopping now and discover
            your perfect style.
          </p>
          <div className="space-x-4">
            <Link to="/shop">
              <button className="bg-primeColor text-white px-8 py-3 rounded-md hover:bg-black transition-colors duration-300 font-medium">
                Continue Shopping
              </button>
            </Link>
            <a href="tel:18001234567">
              <button className="border border-primeColor text-primeColor px-8 py-3 rounded-md hover:bg-primeColor hover:text-white transition-colors duration-300 font-medium">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

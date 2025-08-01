import {
  Clock,
  Facebook,
  Gift,
  Heart,
  Instagram,
  Search,
  ShoppingCart,
  Star,
  Tag,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useOffersPageContent from "../../constants/AEM_content/offersPage_content";

// Deal Timer Component
const DealTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2 text-white">
      <Clock className="w-4 h-4" />
      <span className="font-bold">
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

// Offer Type Card Component
const OfferTypeCard = ({ offer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div
        className={`bg-gradient-to-r ${offer.gradient} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 opacity-20">{offer.icon}</div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">{offer.title}</h3>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
              {offer.badge}
            </span>
          </div>
          <p className="text-lg opacity-90">{offer.subtitle}</p>
          {offer.timer && (
            <div className="mt-4">
              <DealTimer
                endTime={new Date().getTime() + offer.timer * 60 * 60 * 1000}
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-bold text-lg mb-3 text-gray-800">
            What's Included:
          </h4>
          <ul className="space-y-2">
            {offer.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primeColor rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {offer.details && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primeColor font-medium hover:underline flex items-center gap-1"
            >
              {isExpanded ? "Show Less" : "View Details"}
              <Tag className="w-4 h-4" />
            </button>
            {isExpanded && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{offer.details}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-primeColor text-white py-3 px-6 rounded-lg hover:bg-black transition-colors duration-300 font-medium">
            {offer.actionText}
          </button>
          {offer.secondaryAction && (
            <button className="flex-1 border-2 border-primeColor text-primeColor py-3 px-6 rounded-lg hover:bg-primeColor hover:text-white transition-colors duration-300 font-medium">
              {offer.secondaryAction}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Flash Sale Banner Component
const FlashSaleBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-yellow-300" />
              <h2 className="text-2xl font-bold">⚡ FLASH SALE</h2>
            </div>
            <p className="text-lg mb-4">Up to 70% OFF on selected items!</p>
            <DealTimer endTime={new Date().getTime() + 6 * 60 * 60 * 1000} />
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">70%</div>
            <div className="text-lg">OFF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Seasonal Offers Component
const SeasonalOffers = () => {
  const seasonalDeals = [
    {
      season: "Summer Clearance",
      discount: "Up to 70% OFF",
      description: "Beat the heat with our coolest deals of the season",
      gradient: "from-yellow-400 to-orange-500",
      items: ["Swimwear", "Summer Dresses", "Sandals", "Sunglasses", "Shorts"],
    },
    {
      season: "Back to School",
      discount: "Buy 3 Get 2 FREE",
      description: "Get ready for the new academic year with style",
      gradient: "from-blue-500 to-purple-600",
      items: ["Backpacks", "Stationery", "Uniforms", "Shoes", "Electronics"],
    },
    {
      season: "Festive Special",
      discount: "Flat ₹1000 OFF",
      description: "Celebrate in style with our festive collection",
      gradient: "from-pink-500 to-red-500",
      items: ["Traditional Wear", "Jewelry", "Gifts", "Decorations", "Sweets"],
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Seasonal Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {seasonalDeals.map((deal, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div
              className={`bg-gradient-to-r ${deal.gradient} p-6 text-white text-center`}
            >
              <h3 className="text-xl font-bold mb-2">{deal.season}</h3>
              <div className="text-3xl font-bold mb-2">{deal.discount}</div>
              <p className="opacity-90">{deal.description}</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-3">Categories Included:</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {deal.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button className="w-full bg-primeColor text-white py-3 rounded-lg hover:bg-black transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Membership Offers Component
const MembershipOffers = () => {
  const membershipTiers = [
    {
      name: "Silver Member",
      benefits: [
        "5% discount on all purchases",
        "Free shipping on orders above ₹999",
        "Early access to sales",
        "Birthday special discount",
      ],
      requirement: "Spend ₹10,000 annually",
      color: "from-gray-400 to-gray-600",
    },
    {
      name: "Gold Member",
      benefits: [
        "10% discount on all purchases",
        "Free shipping on all orders",
        "Exclusive member-only deals",
        "Priority customer support",
        "Extended return policy",
      ],
      requirement: "Spend ₹25,000 annually",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Platinum Member",
      benefits: [
        "15% discount on all purchases",
        "Free express shipping",
        "Personal shopping assistant",
        "VIP customer events",
        "Complimentary gift wrapping",
        "Exclusive product previews",
      ],
      requirement: "Spend ₹50,000 annually",
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          cnxStore Membership Benefits
        </h2>
        <p className="text-lg text-gray-600">
          The more you shop, the more you save! Join our loyalty program today.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipTiers.map((tier, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primeColor"
          >
            <div
              className={`bg-gradient-to-r ${tier.color} p-6 text-white text-center`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="opacity-90">{tier.requirement}</p>
            </div>
            <div className="p-6">
              <h4 className="font-bold mb-4 text-lg">Member Benefits:</h4>
              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primeColor text-white py-3 rounded-lg hover:bg-black transition-colors duration-300 font-medium">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exciting Deals Component
const ExcitingDeals = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    });
  };

  const currentOffers = [
    {
      title: "Flat 20% off on your first purchase",
      code: "WELCOME20",
      icon: <Gift className="w-5 h-5 text-green-500" />,
      color: "border-green-200 bg-green-50",
    },
    {
      title: "Buy 2, Get 1 Free on all t-shirts and kidswear",
      code: "BUY2GET1",
      icon: <Tag className="w-5 h-5 text-blue-500" />,
      color: "border-blue-200 bg-blue-50",
    },
    {
      title: "End of Season Sale: Up to 60% off on select styles",
      code: "SEASON60",
      icon: <Star className="w-5 h-5 text-purple-500" />,
      color: "border-purple-200 bg-purple-50",
    },
  ];

  const limitedTimeDeals = [
    {
      title: "Flash Sales every Friday",
      description: "Subscribe to our newsletter so you don't miss out!",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Weekly treasure hunt",
      description: "Find hidden discounts in our New Arrivals section",
      icon: <Search className="w-6 h-6 text-indigo-500" />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-12 border border-orange-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Exciting Deals, Every Day – Only on{" "}
          <span className="text-primeColor">cnxStore!</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We love to reward our customers. Whether you're shopping for the first
          time or are a loyal buyer, cnxStore always has something extra for
          you.
        </p>
      </div>

      {/* Current Offers Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primeColor text-white p-2 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Current Offers</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentOffers.map((offer, index) => (
            <div
              key={index}
              className={`${offer.color} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start gap-3 mb-4">
                {offer.icon}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">
                    {offer.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Use code:</span>
                    <code className="bg-white px-3 py-1 rounded font-mono text-sm font-bold text-primeColor border">
                      {offer.code}
                    </code>
                  </div>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(offer.code)}
                className="w-full bg-white text-primeColor border-2 border-primeColor py-2 rounded-lg hover:bg-primeColor hover:text-white transition-colors duration-300 font-medium"
              >
                {copiedCode === offer.code ? "Copied!" : "Copy Code"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Limited Time Deals Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-500 text-white p-2 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            Limited-Time Deals
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {limitedTimeDeals.map((deal, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-primeColor hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">{deal.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{deal.title}</h4>
                  <p className="text-gray-600">{deal.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip Section */}
      <div className="bg-gradient-to-r from-primeColor to-black rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-400 text-black p-2 rounded-lg">
            <Gift className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold">💡 Pro Tip</h3>
        </div>
        <p className="text-lg mb-6">
          Follow us on Instagram and Facebook for early access to exclusive
          coupon codes.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => alert("Opening Instagram...")}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </button>
          <button
            onClick={() => alert("Opening Facebook...")}
            className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center">
      <Gift className="w-12 h-12 text-primeColor mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Get Exclusive Offers!</h3>
      <p className="text-gray-600 mb-6">
        Subscribe to our newsletter and never miss a deal
      </p>

      {subscribed ? (
        <div className="text-green-600 font-semibold">
          Thank you for subscribing!
        </div>
      ) : (
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primeColor"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-primeColor text-white rounded-lg hover:bg-black transition-colors duration-300"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
};

const Offers = () => {
  const [prevLocation, setPrevLocation] = useState("");
  const { pageData, loading, error } = useOffersPageContent();

  // Log the Adobe AEM data
  useEffect(() => {
    if (pageData) {
      console.log("🎁 Offers page data loaded from Adobe AEM:", pageData);
    }
    if (error) {
      console.error("❌ Offers page error:", error);
    }
  }, [pageData, error]);

  // Simple breadcrumb component
  const Breadcrumbs = ({ title, prevLocation }) => (
    <div className="py-4 mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="hover:text-primeColor cursor-pointer">Home</span>
        <span>/</span>
        {prevLocation && (
          <>
            <span className="hover:text-primeColor cursor-pointer">
              {prevLocation}
            </span>
            <span>/</span>
          </>
        )}
        <span className="text-primeColor font-medium">{title}</span>
      </div>
    </div>
  );

  const offerTypes = [
    {
      title: "First-Time Buyer Deals",
      subtitle: "Welcome to cnxStore family!",
      badge: "NEW CUSTOMER",
      gradient: "from-green-500 to-emerald-600",
      icon: <Gift className="w-16 h-16" />,
      features: [
        "Flat 30% off on your first purchase",
        "Free shipping on orders above ₹500",
        "Complimentary gift wrapping",
        "Extended 30-day return policy",
        "Welcome bonus points worth ₹200",
      ],
      details:
        "As a new customer, you get access to our best introductory offers. This deal is valid for 7 days from account creation and can be used on any category except electronics. Combine with seasonal sales for maximum savings!",
      actionText: "Claim Offer",
      secondaryAction: "Terms & Conditions",
    },
    {
      title: "Flash Sale Extravaganza",
      subtitle: "Limited time, maximum savings!",
      badge: "HURRY UP",
      gradient: "from-red-500 to-pink-600",
      icon: <Zap className="w-16 h-16" />,
      timer: 6,
      features: [
        "Up to 80% off on selected items",
        "New deals every hour",
        "Extra 10% off with app purchase",
        "Free express delivery",
        "No minimum order value",
      ],
      details:
        "Our most popular sale event! Flash sales run every Friday from 9 AM to 9 PM. Items are added hourly with limited quantities. Pro tip: Enable push notifications to get instant alerts when your wishlist items go on sale.",
      actionText: "Shop Flash Sale",
      secondaryAction: "Set Alerts",
    },
    {
      title: "Bulk Purchase Benefits",
      subtitle: "More you buy, more you save!",
      badge: "WHOLESALE",
      gradient: "from-blue-500 to-indigo-600",
      icon: <ShoppingCart className="w-16 h-16" />,
      features: [
        "Buy 5+ items, get 20% off",
        "Buy 10+ items, get 35% off",
        "Free bulk packaging",
        "Dedicated support manager",
        "Custom invoice for businesses",
      ],
      details:
        "Perfect for businesses, events, or large families. Our bulk purchase program offers tiered discounts that increase with quantity. Business customers get additional benefits like credit terms and priority processing.",
      actionText: "Start Bulk Order",
      secondaryAction: "Business Signup",
    },
    {
      title: "Referral Rewards Program",
      subtitle: "Share the love, earn rewards!",
      badge: "SOCIAL",
      gradient: "from-purple-500 to-violet-600",
      icon: <Heart className="w-16 h-16" />,
      features: [
        "₹500 for each successful referral",
        "Friend gets 25% off first order",
        "Unlimited referrals allowed",
        "Bonus ₹1000 for 10 referrals",
        "Special referrer badge & status",
      ],
      details:
        "Spread the word about cnxStore and earn amazing rewards! Your referral link gives friends 25% off their first purchase, and you earn ₹500 when they complete their first order. Track your referrals and earnings in your account dashboard.",
      actionText: "Start Referring",
      secondaryAction: "Copy Referral Link",
    },
    {
      title: "Student & Senior Discounts",
      subtitle: "Special pricing for special people!",
      badge: "VERIFIED",
      gradient: "from-teal-500 to-cyan-600",
      icon: <Star className="w-16 h-16" />,
      features: [
        "Students: 15% off all year round",
        "Seniors (60+): 20% off all purchases",
        "Free ID verification process",
        "Stackable with other offers",
        "Exclusive educational & health products",
      ],
      details:
        "We believe in supporting students and honoring seniors. After quick ID verification, enjoy permanent discounts on all purchases. These discounts can be combined with most sale offers for even greater savings.",
      actionText: "Verify Identity",
      secondaryAction: "Learn More",
    },
    {
      title: "Birthday & Anniversary Special",
      subtitle: "Celebrate with exclusive deals!",
      badge: "CELEBRATION",
      gradient: "from-orange-500 to-red-500",
      icon: <Gift className="w-16 h-16" />,
      features: [
        "50% off on your birthday month",
        "Anniversary surprise discount",
        "Free birthday gift with purchase",
        "Exclusive celebration products",
        "Special gift wrapping options",
      ],
      details:
        "Make your special days even more special! Get exclusive discounts during your birthday month and purchase anniversary. We also send surprise discount codes for other personal milestones. Update your profile to never miss these celebrations!",
      actionText: "Update Profile",
      secondaryAction: "View Celebrations",
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Special Offers" prevLocation={prevLocation} />

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

      {/* Hero Section */}
      <div className="pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-primeColor">CNX</span> Special Offers
          </h1>
          <p className="text-lg text-lightText max-w-2xl mx-auto">
            Discover amazing deals and exclusive discounts on your favorite
            products. Limited time offers with up to 70% off selected items!
          </p>
        </div>

        <FlashSaleBanner />
      </div>

      {/* Different Types of Offers */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Explore Our Offer Categories
          </h2>
          <p className="text-lg text-gray-600">
            Discover the perfect deal for every shopping need
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerTypes.map((offer, index) => (
            <OfferTypeCard key={index} offer={offer} />
          ))}
        </div>
      </div>

      {/* Seasonal Offers */}
      <SeasonalOffers />

      {/* Membership Benefits */}
      <MembershipOffers />

      {/* Exciting Deals Section */}
      <ExcitingDeals />

      {/* Newsletter Signup */}
      <div className="mb-12">
        <NewsletterSignup />
      </div>

      {/* Call to Action */}
      <div className="text-center pb-12">
        <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
        <p className="text-gray-600 mb-6">
          New offers are added daily. Check back frequently for the best deals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => alert("Navigate to shop")}
            className="px-8 py-3 bg-primeColor text-white rounded-lg hover:bg-black transition-colors duration-300"
          >
            Browse All Products
          </button>
          <button
            onClick={() => alert("Navigate to wishlist")}
            className="px-8 py-3 border-2 border-primeColor text-primeColor rounded-lg hover:bg-primeColor hover:text-white transition-colors duration-300"
          >
            View Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;

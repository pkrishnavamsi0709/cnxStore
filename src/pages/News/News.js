import React, { useEffect, useState } from "react";
import { Clock, Tag, TrendingUp, Eye, MessageCircle, Share2, Calendar, User, BookOpen, Zap, Globe, Award, ShoppingBag, Heart } from "lucide-react";

// News Article Card Component
const NewsArticleCard = ({ article, size = "medium" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readTime] = useState(Math.floor(Math.random() * 8) + 3);
  
  const cardClasses = size === "featured" 
    ? "col-span-2 row-span-2" 
    : size === "tall" 
    ? "row-span-2" 
    : "";

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  return (
    <article className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${cardClasses}`}>
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            size === "featured" ? "h-64" : "h-48"
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${article.categoryColor}`}>
            {article.category}
          </span>
        </div>
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 rounded-full shadow-md hover:bg-opacity-100"
        >
          <Heart className={`w-4 h-4 ${isBookmarked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        </button>
        {article.breaking && (
          <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">BREAKING</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{getTimeAgo(article.publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{readTime} min read</span>
          </div>
        </div>
        
        <h2 className={`font-bold text-gray-800 mb-3 group-hover:text-primeColor transition-colors ${
          size === "featured" ? "text-2xl" : "text-lg"
        }`}>
          {article.title}
        </h2>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{article.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{article.comments}</span>
            </div>
            <button className="flex items-center gap-1 hover:text-primeColor transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          <button className="bg-primeColor text-white px-4 py-2 rounded-lg hover:bg-black transition-colors duration-300">
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};

// Breaking News Ticker Component
const BreakingNewsTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const breakingNews = [
    "cnxStore launches new AI-powered shopping assistant",
    "Record-breaking sales during summer festival - 2M+ customers served",
    "New sustainable packaging initiative reduces plastic waste by 80%",
    "cnxStore expands to 50 new cities across India",
    "Partnership announced with leading international fashion brands"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-red-600 text-white py-3 mb-8 overflow-hidden">
      <div className="flex items-center">
        <div className="bg-white text-red-600 px-4 py-1 font-bold text-sm mr-4 flex-shrink-0">
          BREAKING NEWS
        </div>
        <div className="animate-pulse">
          <p className="text-lg font-medium">{breakingNews[currentIndex]}</p>
        </div>
      </div>
    </div>
  );
};

// News Categories Filter Component
const NewsCategoriesFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeCategory === category.name
              ? 'bg-primeColor text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.icon}
          {category.name}
        </button>
      ))}
    </div>
  );
};

// Trending Topics Component
const TrendingTopics = () => {
  const trendingTopics = [
    { topic: "Sustainable Fashion", count: "2.5K articles", trend: "+15%" },
    { topic: "AI Shopping", count: "1.8K articles", trend: "+32%" },
    { topic: "E-commerce Growth", count: "3.2K articles", trend: "+8%" },
    { topic: "Customer Experience", count: "2.1K articles", trend: "+22%" },
    { topic: "Digital Transformation", count: "1.9K articles", trend: "+19%" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-primeColor" />
        <h3 className="text-xl font-bold text-gray-800">Trending Topics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {trendingTopics.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <h4 className="font-bold text-gray-800 mb-1">{item.topic}</h4>
            <p className="text-sm text-gray-600 mb-2">{item.count}</p>
            <span className="text-green-600 text-sm font-bold">{item.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Newsletter Subscription Component
const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState("daily");

  const handleSubmit = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-primeColor to-black rounded-xl p-8 text-white mb-8">
      <div className="text-center mb-6">
        <Globe className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Stay Informed with cnxStore News</h3>
        <p className="text-lg opacity-90">Get the latest updates, insights, and exclusive stories delivered to your inbox</p>
      </div>
      
      {subscribed ? (
        <div className="text-center">
          <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-4">
            <h4 className="font-bold text-green-200 mb-2">Successfully Subscribed!</h4>
            <p className="text-green-100">You'll receive {selectedFrequency} updates starting from tomorrow.</p>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email Frequency:</label>
            <div className="flex gap-2">
              {["daily", "weekly", "monthly"].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setSelectedFrequency(freq)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFrequency === freq
                      ? 'bg-white text-primeColor'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  }`}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-white text-primeColor rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Featured Story Component
const FeaturedStory = ({ story }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white mb-8 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6" />
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-bold">
              FEATURED STORY
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{story.title}</h2>
          <p className="text-lg opacity-90 mb-6 leading-relaxed">{story.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{story.date}</span>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-bold">
            Read Full Story
          </button>
        </div>
        <div className="relative">
          <img 
            src={story.image} 
            alt={story.title}
            className="w-full h-64 lg:h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredNews, setFilteredNews] = useState([]);

  // Simple breadcrumb component
  const Breadcrumbs = ({ title, prevLocation = "" }) => (
    <div className="py-4 mb-6">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="hover:text-primeColor cursor-pointer">Home</span>
        <span>/</span>
        {prevLocation && (
          <>
            <span className="hover:text-primeColor cursor-pointer">{prevLocation}</span>
            <span>/</span>
          </>
        )}
        <span className="text-primeColor font-medium">{title}</span>
      </div>
    </div>
  );

  const categories = [
    { name: "All", icon: <Globe className="w-4 h-4" /> },
    { name: "Company News", icon: <ShoppingBag className="w-4 h-4" /> },
    { name: "Industry Updates", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Technology", icon: <Zap className="w-4 h-4" /> },
    { name: "Sustainability", icon: <Heart className="w-4 h-4" /> },
    { name: "Customer Stories", icon: <User className="w-4 h-4" /> },
    { name: "Press Releases", icon: <BookOpen className="w-4 h-4" /> }
  ];

  const featuredStory = {
    title: "cnxStore's Revolutionary AI Shopping Assistant Changes the Game",
    description: "Discover how our latest AI technology is transforming the online shopping experience for millions of customers worldwide. From personalized recommendations to instant customer support, see how artificial intelligence is making shopping smarter, faster, and more enjoyable than ever before.",
    author: "Dr. Priya Sharma, CTO",
    date: "July 22, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"
  };

  const allNews = [
    {
      id: 1,
      title: "cnxStore Achieves Carbon Neutral Operations Across All Facilities",
      excerpt: "In a groundbreaking move towards environmental sustainability, cnxStore has successfully achieved carbon neutrality across all its operations, including warehouses, offices, and logistics networks.",
      category: "Sustainability",
      categoryColor: "bg-green-500",
      author: "Environmental Team",
      publishDate: new Date(2025, 6, 23),
      views: "15.2K",
      comments: "342",
      breaking: true,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Introducing cnxStore Premium: Luxury Shopping Experience Redefined",
      excerpt: "Our new premium tier offers exclusive access to luxury brands, personalized styling services, and white-glove delivery options for discerning customers.",
      category: "Company News",
      categoryColor: "bg-purple-500",
      author: "Marketing Team",
      publishDate: new Date(2025, 6, 22),
      views: "28.7K",
      comments: "156",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "AI-Powered Size Prediction Reduces Returns by 60%",
      excerpt: "cnxStore's innovative AI technology analyzes customer data and product specifications to predict perfect fit sizes, dramatically reducing return rates and improving customer satisfaction.",
      category: "Technology",
      categoryColor: "bg-blue-500",
      author: "Tech Innovation Lab",
      publishDate: new Date(2025, 6, 21),
      views: "42.3K",
      comments: "289",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Customer Success Story: From Small Business to National Brand",
      excerpt: "Meet Rajesh Kumar, whose handmade jewelry business grew from a home operation to a national brand through cnxStore's seller platform, achieving ₹50L annual revenue.",
      category: "Customer Stories",
      categoryColor: "bg-orange-500",
      author: "Success Stories Team",
      publishDate: new Date(2025, 6, 20),
      views: "18.9K",
      comments: "567",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "E-commerce Industry Report: cnxStore Leads in Customer Satisfaction",
      excerpt: "Latest industry analysis reveals cnxStore tops customer satisfaction rankings for the third consecutive year, with 96% customer retention rate and 4.8/5 average rating.",
      category: "Industry Updates",
      categoryColor: "bg-teal-500",
      author: "Research Analytics",
      publishDate: new Date(2025, 6, 19),
      views: "33.1K",
      comments: "124",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "cnxStore Foundation Launches Education Initiative for Rural Areas",
      excerpt: "New program provides digital literacy training and e-commerce opportunities to over 10,000 rural entrepreneurs across India, bridging the digital divide.",
      category: "Company News",
      categoryColor: "bg-indigo-500",
      author: "Foundation Team",
      publishDate: new Date(2025, 6, 18),
      views: "25.4K",
      comments: "892",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop"
    },
    {
      id: 7,
      title: "Revolutionary Blockchain Supply Chain Tracking Goes Live",
      excerpt: "cnxStore becomes first major retailer to implement end-to-end blockchain tracking, allowing customers to trace product journey from manufacturer to doorstep.",
      category: "Technology",
      categoryColor: "bg-cyan-500",
      author: "Blockchain Team",
      publishDate: new Date(2025, 6, 17),
      views: "39.8K",
      comments: "445",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
    },
    {
      id: 8,
      title: "cnxStore Partners with 1000 Local Artisans for Handmade Collection",
      excerpt: "Strategic partnership brings authentic handcrafted products to global market while supporting traditional craftspeople and preserving cultural heritage.",
      category: "Press Releases",
      categoryColor: "bg-pink-500",
      author: "Partnership Team",
      publishDate: new Date(2025, 6, 16),
      views: "21.7K",
      comments: "203",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredNews(allNews);
    } else {
      setFilteredNews(allNews.filter(news => news.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Latest News & Updates" />
      
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-primeColor">cnxStore</span> News Center
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest developments, innovations, and stories from cnxStore. 
          From breakthrough technologies to inspiring customer success stories, discover what's shaping the future of e-commerce.
        </p>
      </div>

      {/* Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Featured Story */}
      <FeaturedStory story={featuredStory} />

      {/* Trending Topics */}
      <TrendingTopics />

      {/* Category Filter */}
      <NewsCategoriesFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* News Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeCategory === "All" ? "Latest News" : `${activeCategory} News`}
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4" />
            <span>{filteredNews.length} articles found</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article, index) => (
            <NewsArticleCard 
              key={article.id} 
              article={article} 
              size={index === 0 ? "featured" : index === 2 ? "tall" : "medium"}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <NewsletterSubscription />

      {/* Call to Action */}
      <div className="text-center pb-12">
        <h2 className="text-2xl font-bold mb-4">Want to Share Your Story?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Have an interesting story about your cnxStore experience? We'd love to hear from you! 
          Contact our editorial team to share your journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => alert('Opening story submission form')}
            className="px-8 py-3 bg-primeColor text-white rounded-lg hover:bg-black transition-colors duration-300"
          >
            Submit Your Story
          </button>
          <button 
            onClick={() => alert('Opening media kit')}
            className="px-8 py-3 border-2 border-primeColor text-primeColor rounded-lg hover:bg-primeColor hover:text-white transition-colors duration-300"
          >
            Download Media Kit
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
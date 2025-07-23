import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const CHAT_HISTORY_KEY = "chatWidgetHistory";

const getInitialMessages = () => [
  { from: "bot", text: "Hi! How can I help you today?" },
];

const ChatWidget = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState(getInitialMessages);
  const [input, setInput] = React.useState("");
  const [context, setContext] = React.useState(null); // 'orders', 'products', 'support', etc.
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [products, setProducts] = React.useState([]); // For product search results
  const [selectedVariants, setSelectedVariants] = React.useState([]); // For multi-select
  const [ordering, setOrdering] = React.useState(false);
  const [orderedVariantsDetails, setOrderedVariantsDetails] = React.useState(
    []
  ); // Store ordered variants for display
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  const [orderResult, setOrderResult] = React.useState(null); // Store order API response

  // Option sets
  const contextOptions = [
    { label: "Orders Status", value: "orders" },
    { label: "Search And Order", value: "products" },
    { label: "Conversational", value: "support" },
  ];

  React.useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openChatWidget", handler);
    return () => window.removeEventListener("openChatWidget", handler);
  }, []);

  const clearChatHistory = () => {
    setMessages(getInitialMessages());
    setContext(null);
    setSelectedOption(null);
  };

  // Handle context option selection
  const handleContextSelect = (option) => {
    setContext(option.value);
    setSelectedOption(option.value);
    setProducts([]);
    setSelectedVariants([]);
    if (option.value === "products") {
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: option.label },
        { from: "bot", text: "Please enter your search to find products." },
      ]);
    } else {
      setMessages((msgs) => [...msgs, { from: "user", text: option.label }]);
    }
  };

  // Handle user sending a message
  const handleSend = async (customInput) => {
    const userInput = customInput !== undefined ? customInput : input;
    if (!userInput.trim()) return;
    // If context is not selected, do nothing (force user to pick context first)
    if (!context) return;
    // --- Product Search Flow ---
    if (context === "products") {
      // Add user message and a bot loading message
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        { from: "bot", text: "Searching for products...", isLoading: true },
      ]);
      setInput("");
      setLoadingProducts(true);

      let products = [];
      try {
        const response = await fetch(
          "https://agent-prod.studio.lyzr.ai/v3/inference/chat/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "sk-default-eJyEAE8QZbGM4I9DKdtnCnFUR6bFQf8Y",
            },
            body: JSON.stringify({
              user_id: "bora.ajaykumar@concentrix.com",
              agent_id: "6880c78e7e4f66ef347d8d4d",
              session_id: "6880c78e7e4f66ef347d8d4d-zc2ao98wo9o",
              message: userInput,
            }),
          }
        );
        const data = await response.json();
        if (Array.isArray(data.products) && data.products.length > 0) {
          products = data.products;
        } else if (typeof data.response === "string") {
          try {
            const parsed = JSON.parse(data.response);
            if (parsed && Array.isArray(parsed.products)) {
              products = parsed.products;
            }
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // Ignore errors for now
      }

      // Dummy fallback products
      const dummyProducts = [
        {
          id: 9257124200665,
          title: "Example T-Shirt",
          product_type: "Shirts",
          variants: [
            {
              id: 46818115715289,
              title: 'Lithograph - Height: 9" x Width: 12"',
              price: "25.00",
            },
            { id: 46818115748057, title: "Small", price: "19.99" },
            { id: 46818115780825, title: "Medium", price: "19.99" },
          ],
          images: [
            {
              id: 45822922850521,
              src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/green-t-shirt.jpg?v=1752674862",
            },
          ],
        },
        {
          id: 9257123905753,
          title: "Black Beanbag",
          product_type: "Indoor",
          variants: [
            { id: 46818113716441, title: "Default Title", price: "69.99" },
          ],
          images: [
            {
              id: 45822919770329,
              src: "https://cdn.shopify.com/s/files/1/0755/5419/3625/files/comfortable-living-room-cat_925x_cac032a2-6215-4cac-b02f-01e45f24dbe8.jpg?v=1752674759",
            },
          ],
        },
      ];
      if (!Array.isArray(products) || products.length === 0) {
        products = dummyProducts;
      }
      setLoadingProducts(false);
      setProducts(products);
      setMessages((msgs) => {
        const newMsgs = [...msgs];
        const lastLoadingIdx = newMsgs
          .map((m) => m.isLoading)
          .lastIndexOf(true);
        if (lastLoadingIdx !== -1) {
          newMsgs[lastLoadingIdx] = {
            from: "bot",
            text:
              products.length > 0
                ? "Here are the products matching your search:"
                : "No products found for your search.",
          };
        }
        return newMsgs;
      });
      return;
    }
    setMessages((msgs) => [...msgs, { from: "user", text: userInput }]);
    setInput("");
    // --- Other Contexts ---
    let apiUrl = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
    if (context === "orders") {
      // Order Status: send order ID as message
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-default-boDM8Mx36JzOUjac0cpKiTucrg0p853x",
          },
          body: JSON.stringify({
            user_id: "parvathi.somanahalli@gmail.com",
            agent_id: "6880f7a1172d1544aaa2f698",
            session_id: "6880f7a1172d1544aaa2f698-pw5vk0zcp0p",
            message: userInput, // order ID
          }),
        });
        const data = await response.json();
        let statusMsg =
          data.message || data.status || data.body || JSON.stringify(data);
        setMessages((msgs) => [...msgs, { from: "bot", text: statusMsg }]);
      } catch (error) {
        setMessages((msgs) => [
          ...msgs,
          {
            from: "bot",
            text: "Sorry, there was an error checking order status.",
          },
        ]);
      }
      return;
    }
    setMessages((msgs) => [...msgs, { from: "user", text: userInput }]);
    setInput("");
    // --- Conversational Context ---
    if (context === "support") {
      apiUrl = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-default-CYSWi0UWelyMdF3VhvhaddPG4dT0LUNt",
          },
          body: JSON.stringify({
            user_id: "parvathi.somanahalli@gmail.com",
            agent_id: "687e12218c24464a4cccaf22",
            session_id: "687e12218c24464a4cccaf22-irfnw1c087n",
            message: userInput,
          }),
        });
        const data = await response.json();
        let botMessage =
          data.response ||
          data.message ||
          data.title ||
          data.body ||
          "Received response from API.";
        setMessages((msgs) => [
          ...msgs,
          {
            from: "bot",
            text:
              typeof botMessage === "string"
                ? botMessage
                : JSON.stringify(botMessage),
          },
        ]);
      } catch (error) {
        setMessages((msgs) => [
          ...msgs,
          {
            from: "bot",
            text: "Sorry, there was an error contacting the API.",
          },
        ]);
      }
    }
  };

  // Handle product variant selection
  const handleVariantToggle = (variantId) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId]
    );
  };

  // Handle order button click
  const handleOrder = async () => {
    setOrdering(true);
    // Find selected product/variant details
    const selectedDetails = [];
    products.forEach((product) => {
      product.variants.forEach((variant) => {
        if (selectedVariants.includes(variant.id)) {
          selectedDetails.push({
            productTitle: product.title,
            variantTitle: variant.title,
            price: variant.price,
            variantId: variant.id,
          });
        }
      });
    });
    // Log selected variants to console
    console.log("Selected variants:", selectedDetails);
    // Show selected variants below the product grid
    setOrderedVariantsDetails(selectedDetails);

    // Build order message
    const variantIds = selectedDetails.map((d) => d.variantId).join(", ");
    const orderMessage = `Order These products: variant ID = ${variantIds}, email = customer500@example.com`;
    // Call the product search API as the order API
    try {
      const response = await fetch(
        "https://agent-prod.studio.lyzr.ai/v3/inference/chat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-default-boDM8Mx36JzOUjac0cpKiTucrg0p853x",
          },
          body: JSON.stringify({
            user_id: "parvathi.somanahalli@gmail.com",
            agent_id: "6880f7a1172d1544aaa2f698",
            session_id: "6880f7a1172d1544aaa2f698-pw5vk0zcp0p",
            message: orderMessage,
          }),
        }
      );
      const data = await response.json();
      let orderResultObj = data;
      if (typeof data.response === "string") {
        try {
          orderResultObj = JSON.parse(data.response);
        } catch (e) {
          orderResultObj = data;
        }
      }
      if (orderResultObj.order_created) {
        setMessages((msgs) => [
          ...msgs,
          {
            from: "bot",
            text: orderResultObj.order_created.message,
          },
        ]);
        setOrderResult(null);
        setTimeout(() => {
          setMessages((msgs) => [
            ...msgs,
            { from: "bot", text: "Hi! How can I help you today?" },
          ]);
          setContext(null);
          setSelectedOption(null);
          setProducts([]);
          setSelectedVariants([]);
          setOrderedVariantsDetails([]);
          setOrderResult(null);
        }, 10500);
        setTimeout(() => {
          setMessages([{ from: "bot", text: "Hi! How can I help you today?" }]);
          setContext(null);
          setSelectedOption(null);
          setProducts([]);
          setSelectedVariants([]);
          setOrderedVariantsDetails([]);
          setOrderResult(null);
        }, 30000);
      } else {
        setOrderResult(
          orderResultObj.message || "Failed to place order. Please try again."
        );
      }
    } catch (error) {
      setOrderResult("Failed to place order. Please try again.");
    }
    setOrdering(false);
    // Optionally, clear selected variants after ordering
    // setSelectedVariants([]);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Centered Chat Modal with larger size and off-white background */}
            <motion.div
              className="relative w-[900px] h-[700px] max-h-[calc(100vh-6rem)] bg-[#f8f9fa] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20"
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Close Button Top Right */}
              <button
                className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 font-bodyFont">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.from === "bot" ? (
                      <div className="flex items-start gap-3">
                        <span className="mt-1 text-xl">✨</span>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-blue-900 font-semibold text-base">
                              CNX AI
                            </span>
                          </div>
                          <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-white text-blue-900 shadow-md max-w-[540px] whitespace-pre-line">
                            {msg.text}
                          </span>
                          {idx === 0 && !context && (
                            <div className="flex flex-col gap-3 mt-3 items-center">
                              {contextOptions.map((option) => (
                                <button
                                  key={option.value}
                                  className="w-full max-w-xs px-4 py-2 rounded-full bg-blue-100 text-blue-900 text-sm font-semibold shadow hover:bg-blue-200 border border-blue-300 transition"
                                  onClick={() => handleContextSelect(option)}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-blue-400/80 text-white shadow-md max-w-[540px] whitespace-pre-line">
                        {msg.text}
                      </span>
                    )}
                  </div>
                ))}
                {/* Move product grid outside the message loop */}
                {context === "products" && products.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-2 font-semibold text-blue-900">
                      Select products to order:
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
                        >
                          <img
                            src={
                              product.images &&
                              product.images[0] &&
                              product.images[0].src
                                ? product.images[0].src
                                : "https://via.placeholder.com/96x96?text=No+Image"
                            }
                            alt={product.title}
                            className="w-24 h-24 object-cover rounded mb-2"
                          />
                          <div className="font-semibold text-primeColor mb-1 text-center">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-700 mb-2 text-center">
                            {product.product_type}
                          </div>
                          <div className="w-full flex flex-col gap-1">
                            {product.variants.map((variant) => (
                              <label
                                key={variant.id}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedVariants.includes(
                                    variant.id
                                  )}
                                  onChange={() =>
                                    handleVariantToggle(variant.id)
                                  }
                                />
                                <span>
                                  {variant.title} - ${variant.price}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedVariants.length > 0 && (
                      <div className="w-full flex justify-center mt-6">
                        <button
                          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition"
                          onClick={handleOrder}
                          disabled={ordering}
                        >
                          {ordering ? "Ordering..." : "Order"}
                        </button>
                      </div>
                    )}
                    {/* Show ordered variants details below the product grid */}
                    {orderedVariantsDetails.length > 0 && (
                      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="font-semibold text-blue-900 mb-2">
                          You have selected:
                        </div>
                        <ul className="list-disc pl-5">
                          {orderedVariantsDetails.map((d, i) => (
                            <li key={i} className="text-blue-900">
                              {d.productTitle} - {d.variantTitle} (${d.price})
                            </li>
                          ))}
                        </ul>
                        {/* Show order API result below the selected variants */}
                        {orderResult && (
                          <div className="mt-4 text-green-700 font-semibold">
                            {orderResult}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Input Area */}
              <div className="px-4 py-4 bg-gray-100 border-t border-gray-200 flex items-center gap-3">
                <input
                  className="flex-1 bg-white border-none rounded-full px-5 py-2 font-bodyFont text-blue-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base shadow"
                  placeholder="Ask me anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={!context} // Disable input until context is selected
                />
                <button
                  type="button"
                  className="bg-blue-400 text-white rounded-full p-3 flex items-center justify-center hover:bg-blue-500 transition shadow"
                  onClick={handleSend}
                  aria-label="Send"
                  disabled={!input.trim() || !context} // Only enable if input is not empty and context is selected
                >
                  {/* Arrow Send Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 12l16-6m0 0l-6 16m6-16L4 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

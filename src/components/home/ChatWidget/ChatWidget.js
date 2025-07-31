import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReactMarkdown from "react-markdown";

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
  const [showProductGrid, setShowProductGrid] = React.useState(false); // NEW: control product grid visibility

  // Option sets
  const contextOptions = [
    { label: "General Queries", value: "support" },
    { label: "Search And Order", value: "products" },
    { label: "Orders Status", value: "orders_status" },
  ];

  React.useEffect(() => {
    // Open chat automatically after login+reload if flag is set
    if (localStorage.getItem("openChatAfterReload") === "true") {
      setOpen(true);
      localStorage.removeItem("openChatAfterReload");
    }
    const handler = () => {
      // Always open chat without login requirement
      setOpen(true);
      // Set dummy email for API calls
      localStorage.setItem("userEmail", "kiran@gmail.com");
    };
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
      setMessages([
        { from: "bot", text: "Please enter your search to find products." },
      ]);
    } else if (option.value === "orders_status") {
      // Always clear all messages and show only the order ID prompt
      setMessages([
        {
          from: "bot",
          text: "Please provide your order ID to check the status.",
        },
      ]);
    } else if (option.value === "support") {
      setMessages([
        {
          from: "bot",
          text: "How can I assist you? Please enter your query below.",
        },
      ]);
      return;
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

      let products = [
        {
          id: 7650044379219,
          title: "White Button-Up Shirt",
          product_type: "clothing",
          variants: [
            {
              id: 42910842454099,
              title: "Holographic / S / Cotton",
              price: "2234.99",
              color: "Holographic",
              size: "S",
              fabric: "Cotton",
              quantityAvailable: 15,
              availableForSale: true,
              sku: "FDSAGREGF3",
            },
            {
              id: 42910842486867,
              title: "Holographic / L / Cotton",
              price: "2234.99",
              color: "Holographic",
              size: "L",
              fabric: "Cotton",
              quantityAvailable: 15,
              availableForSale: true,
              sku: "FDSAGREGF4",
            },
            {
              id: 42910842519635,
              title: "Holographic / M / Cotton",
              price: "2234.99",
              color: "Holographic",
              size: "M",
              fabric: "Cotton",
              quantityAvailable: 15,
              availableForSale: true,
              sku: "FDSAGREGF5",
            },
          ],
          images: [
            {
              id: 0, // No image ID provided, assigning 0 as placeholder
              src: "https://cdn.shopify.com/s/files/1/0654/7780/4115/files/person-in-a-white-shirt-stands-by-the-water.jpg?v=1753181507",
              altText: "White Button-Up Shirt",
            },
          ],
        },
        {
          id: 7650044411987,
          title: "Bearded Man in White Shirt",
          product_type: "clothing",
          variants: [
            {
              id: 42910831673427,
              title: "White / 3XL / Cotton",
              price: "3552.50",
              color: "White",
              size: "3XL",
              fabric: "Cotton",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "FSGDGREE3",
            },
            {
              id: 42910831706195,
              title: "White / XS / Cotton",
              price: "3552.50",
              color: "White",
              size: "XS",
              fabric: "Cotton",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "FSGDGREE4",
            },
            {
              id: 42910831738963,
              title: "White / 2XL / Cotton",
              price: "3552.50",
              color: "White",
              size: "2XL",
              fabric: "Cotton",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "FSGDGREE5",
            },
          ],
          images: [
            {
              id: 0, // Image ID is not present in your data, so keeping 0 as placeholder
              src: "https://cdn.shopify.com/s/files/1/0654/7780/4115/files/Screenshot2025-07-22155041.png?v=1753181568",
              altText: "Bearded Man in White Shirt",
            },
          ],
        },
        {
          id: 7650046672979,
          title: "Light Blue Casual Shirt",
          product_type: "clothing",
          variants: [
            {
              id: 42910670651475,
              title: "Blue",
              price: "4578.00",
              color: "Blue",
              size: "", // Size not available in the data
              fabric: "", // Fabric not available in the data
              quantityAvailable: 9,
              availableForSale: true,
              sku: "SDVSGE3FF-1",
            },
            {
              id: 42910670684243,
              title: "Yellow",
              price: "4578.00",
              color: "Yellow",
              size: "", // Size not available in the data
              fabric: "", // Fabric not available in the data
              quantityAvailable: 20,
              availableForSale: true,
              sku: "SDVSGE3FF-2",
            },
          ],
          images: [
            {
              id: 0,
              src: "https://cdn.shopify.com/s/files/1/0654/7780/4115/files/Screenshot2025-07-22163017.png?v=1753182448",
              altText: "Light Blue Casual Shirt",
            },
          ],
        },
        {
          id: 7650056536147,
          title: "Embroidered White Satin Shirt",
          product_type: "Clothing",
          variants: [
            {
              id: 42910454415443,
              title: "Floral / 3XL / Satin",
              price: "48.50",
              color: "Floral",
              size: "3XL",
              fabric: "Satin",
              quantityAvailable: 12,
              availableForSale: true,
              sku: "WMN-FLORAL-WHITE-001",
            },
            {
              id: 42910454448211,
              title: "Floral / XS / Satin",
              price: "48.50",
              color: "Floral",
              size: "XS",
              fabric: "Satin",
              quantityAvailable: 12,
              availableForSale: true,
              sku: "WMN-FLORAL-WHITE-002",
            },
            {
              id: 42910454480979,
              title: "Floral / 2XL / Satin",
              price: "48.50",
              color: "Floral",
              size: "2XL",
              fabric: "Satin",
              quantityAvailable: 12,
              availableForSale: true,
              sku: "WMN-FLORAL-WHITE-003",
            },
          ],
          images: [
            {
              id: 0,
              src: "https://cdn.shopify.com/s/files/1/0654/7780/4115/files/Screenshot2025-07-22170946.png?v=1753185144",
              altText: "Embroidered White Satin Shirt",
            },
          ],
        },
        {
          id: 7649959870547,
          title: "White shirt",
          product_type: "clothing",
          variants: [
            {
              id: 42910876794963,
              title: "White / 3XL / Cotton",
              price: "8760.0",
              color: "White",
              size: "3XL",
              fabric: "Cotton",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "DFGHBVCX1",
            },
            {
              id: 42910876827731,
              title: "White / 3XL / Faux fur",
              price: "8760.0",
              color: "White",
              size: "3XL",
              fabric: "Faux fur",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "DFGHBVCX2",
            },
            {
              id: 42910876860499,
              title: "White / XS / Cotton",
              price: "8760.0",
              color: "White",
              size: "XS",
              fabric: "Cotton",
              quantityAvailable: 33,
              availableForSale: true,
              sku: "DFGHBVCX3",
            },
          ],
          images: [
            {
              id: 0,
              src: "https://cdn.shopify.com/s/files/1/0654/7780/4115/files/person-in-a-white-shirt-walks-across-the-street.jpg?v=1753159395",
              altText: "White shirt",
            },
          ],
        },
      ];
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
        if (true) {
          products = products;
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
      const usingDummyProducts =
        !Array.isArray(products) || products.length === 0;
      if (usingDummyProducts) {
        products = dummyProducts;
      }
      setLoadingProducts(false);
      setProducts(products);
      setShowProductGrid(true); // NEW: control product grid visibility
      setMessages((msgs) => {
        const newMsgs = [...msgs];
        const lastLoadingIdx = newMsgs
          .map((m) => m.isLoading)
          .lastIndexOf(true);
        if (lastLoadingIdx !== -1) {
          if (!usingDummyProducts) {
            newMsgs[lastLoadingIdx] = {
              from: "bot",
              text: "Here are the products matching your search:",
            };
          } else {
            newMsgs[lastLoadingIdx] = {
              from: "bot",
              text: "Sorry, No products found for your search. Here are some products for you to choose from",
            };
          }
        }
        return newMsgs;
      });
      return;
    }
    if (context === "orders_status") {
      const apiUrl = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
      // Order Status: send order ID as message
      // Show loading message
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        {
          from: "bot",
          text: "Getting your order status, please wait...",
          isLoading: true,
        },
      ]);
      setInput("");
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
            session_id: "6880f7a1172d1544aaa2f698-5xlqk1gh5lu",
            message: userInput, // order ID
          }),
        });
        const data = await response.json();
        let statusMsg =
          data.message || data.status || data.body || JSON.stringify(data);
        // Try to parse and style order status if possible
        let orderObj = null;
        let isOrderStatus = false;
        if (typeof data.response === "string") {
          try {
            const parsed = JSON.parse(data.response);
            if (parsed && parsed.order_id) {
              orderObj = parsed;
              isOrderStatus = true;
            }
          } catch (e) {}
        } else if (data.response && data.response.order_id) {
          orderObj = data.response;
          isOrderStatus = true;
        }
        // Replace the loading message with the result
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          const lastLoadingIdx = newMsgs
            .map((m) => m.isLoading)
            .lastIndexOf(true);
          if (lastLoadingIdx !== -1) {
            newMsgs.splice(lastLoadingIdx, 1);
          }
          if (isOrderStatus && orderObj) {
            newMsgs.push({ from: "bot", isOrderStatus: true, orderObj });
          } else {
            newMsgs.push({ from: "bot", text: statusMsg });
          }
          return newMsgs;
        });
        return;
      } catch (error) {
        setMessages((msgs) => [
          ...msgs.filter((m) => !m.isLoading),
          {
            from: "bot",
            text: "Sorry, there was an error checking order status.",
          },
        ]);
      }
      return;
    }
    if (context === "support") {
      const apiUrl = "https://agent-prod.studio.lyzr.ai/v3/inference/chat/";
      setMessages((msgs) => [
        ...msgs,
        { from: "user", text: userInput },
        { from: "bot", text: "Let me check that for you...", isLoading: true },
      ]);
      setInput("");
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "sk-default-boDM8Mx36JzOUjac0cpKiTucrg0p853x",
          },
          body: JSON.stringify({
            user_id: "parvathi.somanahalli@gmail.com",
            agent_id: "68822554172d1544aaa30354",
            session_id: "68822554172d1544aaa30354-qabjmzcsky",
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
        // Replace the waiting message with the actual response
        setMessages((msgs) => {
          const newMsgs = [...msgs];
          const lastLoadingIdx = newMsgs
            .map((m) => m.isLoading)
            .lastIndexOf(true);
          if (lastLoadingIdx !== -1) {
            newMsgs.splice(lastLoadingIdx, 1);
          }
          newMsgs.push({
            from: "bot",
            text:
              typeof botMessage === "string"
                ? botMessage
                : JSON.stringify(botMessage),
          });
          return newMsgs;
        });
        return;
      } catch (error) {
        setMessages((msgs) => [
          ...msgs.filter((m) => !m.isLoading),
          {
            from: "bot",
            text: "Sorry, there was an error contacting the API.",
          },
        ]);
      }
      return;
    } else {
      setMessages((msgs) => [...msgs, { from: "user", text: userInput }]);
      setInput("");
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
    // Always use dummy email for orders
    const loggedInUserEmail = "kiran@gmail.com";
    const orderMessage =
      "Order These products: variant ID = " +
      variantIds +
      ', email = "kiran@gmail.com"';
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
            user_id: "parvathi.somanahalli@concentrix.com",
            agent_id: "68872e64c9c08f1592801e0f",
            session_id: "68872e64c9c08f1592801e0f-23knoh3uucri",
            message: orderMessage,
          }),
        }
      );
      const data = await response.json();
      console.log("Order API Response:", data); // Debug log

      let orderResultObj = data;
      if (typeof data.response === "string") {
        try {
          orderResultObj = JSON.parse(data.response);
          console.log("Parsed order result:", orderResultObj); // Debug log
        } catch (e) {
          console.error("Error parsing response:", e); // Debug log
          orderResultObj = data;
        }
      }

      // Check if order was created successfully - handle different response formats
      let orderData = null;

      if (orderResultObj.order_created) {
        orderData = orderResultObj.order_created;
      } else if (orderResultObj.response) {
        try {
          const parsedResponse = JSON.parse(orderResultObj.response);
          if (parsedResponse.order_created) {
            orderData = parsedResponse.order_created;
          }
        } catch (e) {
          console.error("Error parsing response.order_created:", e);
        }
      }

      if (orderData) {
        console.log("Order created successfully:", orderData); // Debug log

        setMessages((msgs) => {
          let newMsgs = [...msgs];
          while (newMsgs.length && newMsgs[newMsgs.length - 1].isLoading) {
            newMsgs.pop();
          }
          newMsgs.push({
            from: "bot",
            isOrderCreated: true,
            orderCreatedObj: orderData,
          });
          newMsgs.push({
            from: "bot",
            text: "You can search for more products by entering a query below.",
          });
          return newMsgs;
        });
        setOrderResult(null);
      } else {
        console.log("Order creation failed:", orderResultObj); // Debug log

        // Try to extract order information from the response even if parsing failed
        if (orderResultObj.response) {
          try {
            const responseText = orderResultObj.response;
            if (
              responseText.includes("order_created") &&
              responseText.includes("id")
            ) {
              // Show a generic success message with the response
              setMessages((msgs) => {
                let newMsgs = [...msgs];
                while (
                  newMsgs.length &&
                  newMsgs[newMsgs.length - 1].isLoading
                ) {
                  newMsgs.pop();
                }
                newMsgs.push({
                  from: "bot",
                  text: "Order placed successfully! Check the response details in the console for order information.",
                });
                return newMsgs;
              });
              setOrderResult(null);
              return;
            }
          } catch (e) {
            console.error("Error processing response:", e);
          }
        }

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

  // Handler to go back to main menu
  const handleBackToMainMenu = () => {
    setContext(null);
    setSelectedOption(null);
    setProducts([]);
    setSelectedVariants([]);
    setOrderedVariantsDetails([]);
    setOrderResult(null);
    setMessages(getInitialMessages());
  };

  // Helper to render order status card
  const renderOrderStatusCard = (order) => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
      <div className="font-semibold text-blue-900 mb-2">
        Order #{order.order_number}
      </div>
      <div className="text-blue-900 mb-1">
        Product: <span className="font-medium">{order.product}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Quantity: <span className="font-medium">{order.quantity}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Total Paid: <span className="font-medium">{order.total_paid}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Status: <span className="font-medium">{order.status}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Fulfillment:{" "}
        <span className="font-medium">{order.fulfillment_status}</span>
      </div>
      <div className="text-blue-900 mb-1">
        Order Date: <span className="font-medium">{order.order_date}</span>
      </div>
    </div>
  );

  // Helper to render order created card
  const renderOrderCreatedCard = (order) => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md">
      <div className="font-semibold text-green-900 mb-2">
        Order Placed Successfully!
      </div>
      <div className="text-green-900 mb-1">
        Track ID: <span className="font-medium">{order.id}</span>
      </div>
      <div className="text-green-900 mb-1">
        Order ID: <span className="font-medium">{order.order_id}</span>
      </div>
      <div className="text-green-900 mb-1">
        Product: <span className="font-medium">{order.product}</span>
      </div>
      <div className="text-green-900 mb-1">
        Total Paid: <span className="font-medium">{order.total_paid}</span>
      </div>
      <div className="text-green-900 mt-2">{order.message}</div>
    </div>
  );

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
              {/* Back to Main Menu Icon Button */}
              {context && (
                <button
                  className="absolute left-4 top-4 bg-white text-blue-900 p-2 rounded-full shadow hover:bg-blue-100 border border-blue-200 transition flex items-center justify-center z-20"
                  onClick={handleBackToMainMenu}
                  title="Back to Main Menu"
                  aria-label="Back to Main Menu"
                  style={{ width: 36, height: 36 }}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
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
              {/* Add extra padding to chat content to avoid overlap */}
              <div className="flex-1 overflow-y-auto px-6 pt-16 pb-8 space-y-8 font-bodyFont">
                {messages.map((msg, idx) => (
                  <React.Fragment key={idx}>
                    <div
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
                            {msg.isOrderCreated && msg.orderCreatedObj ? (
                              renderOrderCreatedCard(msg.orderCreatedObj)
                            ) : msg.isOrderStatus && msg.orderObj ? (
                              renderOrderStatusCard(msg.orderObj)
                            ) : msg.from === "bot" &&
                              msg.text &&
                              msg.text.match(/[#*\-`]/) ? (
                              <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-white text-blue-900 shadow-md max-w-[540px] whitespace-pre-line">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                              </span>
                            ) : (
                              <span className="inline-block px-5 py-3 rounded-2xl font-bodyFont text-base bg-white text-blue-900 shadow-md max-w-[540px] whitespace-pre-line">
                                {msg.text}
                              </span>
                            )}
                            {/* Insert product grid immediately after the search result message */}
                            {(msg.text ===
                              "Here are the products matching your search:" ||
                              msg.text ===
                                "Sorry, No products found for your search. Here are some products for you to choose from") &&
                              products.length > 0 && (
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
                                                  handleVariantToggle(
                                                    variant.id
                                                  )
                                                }
                                              />
                                              <span>
                                                {variant.title} - $
                                                {variant.price}
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
                                            {d.productTitle} - {d.variantTitle}{" "}
                                            (${d.price})
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
                            {/* Restore main menu (context selection buttons) when context is null and this is the first message */}
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
                  </React.Fragment>
                ))}
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

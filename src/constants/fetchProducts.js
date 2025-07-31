import axios from "axios";

const SHOPIFY_DOMAIN = "n5ycpj-wu.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "8d91ced9b9dc8eb6c38c314e9eb73c8d";

export const getPaginationItems = async () => {
  const query = `
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            productType
            images(first: 5) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 3) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const response = await axios.post(
      `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`,
      { query },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    let products =
      response.data?.data?.products?.edges?.map((edge) => edge.node) || [];
    console.log("Fetched products:", products);
    products = products.map((product, index) => {
      let { id, images, variants } = product;

      // Process variants to extract color, size, and other options
      const processedVariants = variants.edges.map((variantEdge) => {
        const variant = variantEdge.node;
        const options = {};

        // Extract color, size, and other options from selectedOptions
        variant.selectedOptions.forEach((option) => {
          const optionName = option.name.toLowerCase();
          if (optionName.includes("color") || optionName.includes("colour")) {
            options.color = option.value;
          } else if (optionName.includes("size")) {
            options.size = option.value;
          } else {
            options[optionName] = option.value;
          }
        });

        return {
          id: variant.id,
          title: variant.title,
          sku: variant.sku,
          price: variant.price.amount,
          currencyCode: variant.price.currencyCode,
          compareAtPrice: variant.compareAtPrice?.amount,
          availableForSale: variant.availableForSale,
          quantityAvailable: variant.quantityAvailable || 0,
          color: options.color || "Default",
          size: options.size || "Default",
          ...options,
        };
      });

      // Get the first variant's price as the main product price
      const firstVariant = processedVariants[0];
      const mainPrice = firstVariant ? firstVariant.price : "0.00";

      // Get all available colors and sizes
      const colors = [
        ...new Set(processedVariants.map((v) => v.color).filter(Boolean)),
      ];
      const sizes = [
        ...new Set(processedVariants.map((v) => v.size).filter(Boolean)),
      ];

      return {
        _id: index,
        name: product.title || "",
        img: images.edges[0]?.node.src || "",
        productName: product.title || "",
        price: mainPrice,
        color: colors.length > 0 ? colors.join(", ") : "Default",
        badge: true,
        des: product.description || "",
        category: product.productType || "",
        variants: processedVariants,
        availableColors: colors,
        availableSizes: sizes,
        totalVariants: processedVariants.length,
      };
    });
    return products;
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return [];
  }
};

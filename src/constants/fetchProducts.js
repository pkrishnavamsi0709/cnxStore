import axios from "axios";

const SHOPIFY_DOMAIN = "0rdi0c-b0.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "bbb6212a97cc1d9a15d89ec3cbfa92a1";

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
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
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
      let { id, images } = product;
      return {
        _id: index,
        name: product.title || "",
        img: images.edges[0]?.node.src || "",
        productName: product.title || "",
        price: product.variants.edges[0]?.node.price.amount || "0.00",
        color: "Blank and White",
        badge: true,
        des: product.description || "",
        category: product.productType || "",// Adding an index as id for simplicity
      };
    });
    return products;
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return [];
  }
};

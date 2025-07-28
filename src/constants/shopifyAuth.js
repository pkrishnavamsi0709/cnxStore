import axios from "axios";

export const SHOPIFY_DOMAIN = "n5ycpj-wu.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN = "8d91ced9b9dc8eb6c38c314e9eb73c8d";

export async function shopifyRegister({
  email,
  password,
  firstName,
  lastName,
}) {
  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };
  const response = await axios.post(
    `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`,
    { query, variables },
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function shopifyLogin({ email, password }) {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      email,
      password,
    },
  };
  const response = await axios.post(
    `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`,
    { query, variables },
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
}

export async function shopifyGetCustomerOrders(accessToken) {
  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              name
              processedAt
              totalPriceV2 {
                amount
                currencyCode
              }
              fulfillmentStatus
              financialStatus
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image {
                        src
                      }
                      priceV2 {
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
      }
    }
  `;
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
  return response.data;
}

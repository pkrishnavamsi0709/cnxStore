import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SHOPIFY_DOMAIN, SHOPIFY_STOREFRONT_TOKEN } from "../../constants/shopifyAuth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("shopifyAccessToken");
    if (!accessToken) {
      navigate("/signin");
      return;
    }

    const cachedUser = sessionStorage.getItem('shopifyUser');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      setLoading(true);
      setError("");
      try {
        const query = `query { customer(customerAccessToken: "${accessToken}") { firstName lastName email phone } }`;
        const res = await axios.post(
          `https://${SHOPIFY_DOMAIN}/api/2023-07/graphql.json`,
          { query },
          {
            headers: {
              "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(res.data.data.customer);
        sessionStorage.setItem('shopifyUser', JSON.stringify(res.data.data.customer));
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!user) return <div className="p-8">No user details found.</div>;

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <div className="space-y-4">
        <div><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</div>
        <div><span className="font-semibold">Email:</span> {user.email}</div>
        {user.phone && <div><span className="font-semibold">Phone:</span> {user.phone}</div>}
      </div>
      <button
        className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
        onClick={() => {
          sessionStorage.removeItem("shopifyAccessToken");
          sessionStorage.removeItem("shopifyUser");
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile; 
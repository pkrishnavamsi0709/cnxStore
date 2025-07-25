import React, { useEffect, useState } from "react";
import { shopifyGetCustomerOrders } from "../../constants/shopifyAuth";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("shopifyAccessToken");
    if (!accessToken) {
      navigate("/signin");
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await shopifyGetCustomerOrders(accessToken);
        const orderEdges = res.data?.customer?.orders?.edges || [];
        setOrders(orderEdges.map(edge => edge.node));
      } catch (err) {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="p-8">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!orders.length) return <div className="p-8">No orders found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order:</span>
              <span>{order.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Date:</span>
              <span>{new Date(order.processedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span>{order.totalPriceV2.amount} {order.totalPriceV2.currencyCode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Status:</span>
              <span>{order.fulfillmentStatus}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Items:</span>
              <ul className="ml-4 list-disc">
                {order.lineItems.edges.map(({ node }, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {node.variant?.image?.src && (
                      <img src={node.variant.image.src} alt="" className="w-8 h-8 object-cover rounded" />
                    )}
                    <span>{node.title} x {node.quantity}</span>
                    <span className="ml-2 text-sm text-gray-500">{node.variant?.priceV2?.amount} {node.variant?.priceV2?.currencyCode}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 
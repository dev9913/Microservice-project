import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = window._env_.ORDER_API;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchOrders = async () => {
    const res = await axios.get(`${API_URL}/orders`);
    setOrders(res.data);
  };

  const createOrder = async () => {
    if (!productId || !quantity) return alert("Fill all fields");

    try {
      await axios.post(`${API_URL}/orders`, {
        productId,
        quantity
      });
      setProductId("");
      setQuantity("");
      fetchOrders();
    } catch {
      alert("Product not found");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>🛒 Orders</h2>

      <input
        placeholder="Product ID"
        value={productId}
        onChange={e => setProductId(e.target.value)}
      />
      <input
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button className="btn-order" onClick={createOrder}>
        Create Order
      </button>

      {orders.length === 0 ? (
        <p className="empty">No orders yet</p>
      ) : (
        <div className="list">
  {orders.map(o => (
    <div key={o._id} className="item">
      <div className="item-header">
        <div className="item-title">{o.productName}</div>
        <div className="badge">Qty: {o.quantity}</div>
      </div>

      <div className="meta">Product ID: {o.productId}</div>
      <div className="meta">Order ID: {o._id}</div>
    </div>
  ))}
</div>
      )}
    </div>
  );
}

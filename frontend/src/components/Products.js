import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = window._env_.PRODUCT_API;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [lastCreated, setLastCreated] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    setProducts(res.data);
  };

  const createProduct = async () => {
    if (!name || !price) return alert("Fill all fields");

    const res = await axios.post(`${API_URL}/products`, {
      name,
      price
    });

    setLastCreated(res.data); //  store created product
    setName("");
    setPrice("");
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

return (
  <div>
    <h2>📦 Products</h2>

    <input
      placeholder="Product Name"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <input
      placeholder="Price"
      value={price}
      onChange={e => setPrice(e.target.value)}
    />

    <button onClick={createProduct}>Add Product</button>

    {/*  Show last created product */}
    {lastCreated && (
      <div className="success">
        ✅ Created: {lastCreated.name} (ID: {lastCreated._id})
      </div>
    )}

    {/*  Product List */}
    <div className="list">
  {products.map((o) => (
    <div key={o._id} className="item">
      <div className="item-header">
        <div className="item-title">{o.name}</div>
        <div className="badge">₹{o.price}</div>
      </div>

      <div className="meta">Product ID: {o._id}</div>
    </div>
  ))}
</div>  
  </div>
);
}

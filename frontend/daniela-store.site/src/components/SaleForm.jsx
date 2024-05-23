// SaleForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

const SaleForm = () => {
  const [qty, setQty] = useState('');
  const [productId, setProductId] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar lista de productos al montar el componente
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error loading products');
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/sales', { qty, products_id: productId, users_id: userId });
      setQty('');
      setProductId('');
      setUserId('');
      setError('');
      alert("Sale created!")
    } catch (error) {
      setError('Error creating sale');
    }
  };

  return (
    <div>
      <h2>Create Sale</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quantity:</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} />
        </div>
        <div>
          <label>Product:</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>User Id:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <button type="submit">Create Sale</button>
      </form>
    </div>
  );
};

export default SaleForm;

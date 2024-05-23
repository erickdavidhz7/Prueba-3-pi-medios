// SaleList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const SaleList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Sale List</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>id:{sale.id} - quantity {sale.qty} - sale at {sale.sale_at}</li>
        ))}
      </ul>
    </div>
  );
};

export default SaleList;

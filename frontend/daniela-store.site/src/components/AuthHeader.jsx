// AuthHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = ({ isAdmin, onLogout }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/products/create">Create Product</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/users/create">Create User</Link></li>
          <li><Link to="/admin/users/roles">Assign User Roles</Link></li>
          <li><Link to="/admin/sales">Sales</Link></li>
          <li><Link to="/admin/sales/create">Create Sale</Link></li>
          <li><button onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;

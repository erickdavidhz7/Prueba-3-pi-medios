// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserRoleAssignment from './components/UserRoleAssignment';
import SaleForm from './components/SaleForm';
import SaleList from './components/SaleList';
import LoginForm from './components/LoginForm';
import axios from './utils/axiosConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (authStatus, adminStatus) => {
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
    axios.defaults.headers.common['Auth'] = null;
  };

  return (
    <Router>
      {isAuthenticated && <AuthHeader isAdmin={isAdmin} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        {isAuthenticated && isAdmin ? (
          <>
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/create" element={<ProductForm />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/users/create" element={<UserForm />} />
            <Route path="/admin/users/roles" element={<UserRoleAssignment />} />
            <Route path="/admin/sales" element={<SaleList />} />
            <Route path="/admin/sales/create" element={<SaleForm />} />
            <Route path="/" element={<Navigate to="/admin/products" />} />
          </>
        ) : isAuthenticated && !isAdmin ? (
          <Route path="/" element={<Navigate to="/admin/products" />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

// UserRoleAssignment.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

const UserRoleAssignment = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar lista de usuarios al montar el componente
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        setError('Error loading users');
      }
    };

    // Cargar lista de roles al montar el componente
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles');
        setRoles(response.data);
      } catch (error) {
        setError('Error loading roles');
      }
    };

    fetchUsers();
    fetchRoles();
  }, []);

  const handleUserRoleChange = async () => {
    try {
      console.log(selectedRole);
      await axios.patch(`/roles/${selectedUserId}`, { role: selectedRole });
      alert("Role changed!")
    } catch (error) {
      setError('Error updating user role');
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User Role Assignment</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Select User:</label>
        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Role:</label>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">Select a role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleUserRoleChange}>Assign Role</button>
    </div>
  );
};

export default UserRoleAssignment;

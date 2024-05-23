// UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>Document:{user.document} - Name:{user.name} - last name:{user.last_name} - role_id: {user.roles_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

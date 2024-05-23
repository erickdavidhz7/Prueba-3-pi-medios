// UserForm.jsx
import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

const UserForm = () => {
  const [document, setDocument] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { document, last_name: lastName, name, password });
      setDocument('');
      setLastName('');
      setName('');
      setPassword('');
      setError('');
      alert("User created!")
    } catch (error) {
      setError('Error creating user');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Document:</label>
          <input type="text" value={document} onChange={(e) => setDocument(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;

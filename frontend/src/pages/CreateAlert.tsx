import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlert } from '../api/alerts';
import { motion } from 'framer-motion';

const CreateAlert: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !age || !file) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      await createAlert(formData);
      navigate('/');
    } catch {
      setError('Failed to create alert. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          padding: '16px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Create Alert</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: '8px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ marginTop: '8px', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>File:</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ marginTop: '8px', width: '100%' }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Create Alert
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateAlert;

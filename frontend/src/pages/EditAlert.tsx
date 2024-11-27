import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAlertById, updateAlert } from '../api/alerts';
import { motion } from 'framer-motion';

const EditAlert: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getAlertById(Number(id));
        setName(data.name);
        setAge(String(data.age));
        setError(null);
      } catch (err) {
        setError('Failed to load alert details.');
      }
    };

    fetchAlert();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!age || Number(age) <= 0) {
      setError('Age must be a positive number.');
      return;
    }

    try {
      await updateAlert(Number(id), { name, age: Number(age) });
      navigate(`/alerts/${id}`);
    } catch (err) {
      setError('Failed to update alert. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',
        padding: '16px',
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: '500px',
          width: '100%',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '16px',
        }}
      >
        {}
        <nav style={{ marginBottom: '16px' }}>
          <Link to="/" style={{ color: '#007BFF', textDecoration: 'none' }}>
            Home
          </Link>{' '}
          {">"}{' '}
          <Link
            to={`/alerts/${id}`}
            style={{ color: '#007BFF', textDecoration: 'none' }}
          >
            Alert Details
          </Link>{' '}
          {">"} Edit Alert
        </nav>

        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Edit Alert</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '48%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/alerts/${id}`)}
              style={{
                width: '48%',
                padding: '12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditAlert;

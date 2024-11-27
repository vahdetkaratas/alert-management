import React, { useEffect, useState } from 'react';
import { getAlerts, deleteAlert } from '../api/alerts';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Alert {
  id: number;
  name: string;
  age: number;
  fileUrl: string;
}

const AlertsList: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (err) {
        setError('Failed to load alerts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center' }}>Loading alerts...</div>;
  if (error)
    return (
      <div style={{ textAlign: 'center', color: 'red', margin: '16px 0' }}>
        {error}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',
        padding: '32px',
      }}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '700px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Alerts List</h1>

        <Link
          to="/create"
          style={{
            display: 'block',
            margin: '16px 0',
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#007BFF',
            padding: '8px 16px',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          + Create New Alert
        </Link>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {alerts.map((alert) => (
            <motion.li
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * alert.id }}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2 style={{ margin: 0 }}>{alert.name}</h2>
              <p>Age: {alert.age}</p>
              <a
                href={`http://localhost:3001/${alert.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  color: '#007BFF',
                  textDecoration: 'none',
                }}
              >
                View Attached File
              </a>
              <div style={{ marginTop: '16px' }}>
                <Link
                  to={`/alerts/${alert.id}`}
                  style={{
                    marginRight: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                  }}
                >
                  View Details
                </Link>
                <Link
                  to={`/alerts/${alert.id}/edit`}
                  style={{
                    marginRight: '8px',
                    padding: '8px 16px',
                    backgroundColor: 'orange',
                    color: 'white',
                    borderRadius: '4px',
                    textDecoration: 'none',
                  }}
                >
                  Edit Alert
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this alert?')) {
                      deleteAlert(alert.id);
                      setAlerts((prevAlerts) => prevAlerts.filter((a) => a.id !== alert.id));
                    }
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete Alert
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default AlertsList;

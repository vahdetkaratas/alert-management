import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAlertById, deleteAlert } from '../api/alerts';
import { motion, AnimatePresence } from 'framer-motion';

interface Alert {
  id: number;
  name: string;
  age: number;
  fileUrl: string;
}

const AlertDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getAlertById(Number(id));
        setAlert(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch alert details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAlert(Number(id));
      navigate('/'); // Redirect to AlertsList after deletion
    } catch (err) {
      console.error('Failed to delete alert:', err);
      setError('Failed to delete alert. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;

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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
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
          {">"} Alert Details
        </nav>

        <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Alert Details</h1>
        {alert ? (
          <div>
            <p style={{ margin: '8px 0' }}>
              <strong>Name:</strong> {alert.name}
            </p>
            <p style={{ margin: '8px 0' }}>
              <strong>Age:</strong> {alert.age}
            </p>
            <a
              href={`http://localhost:3001/${alert.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: '#007BFF',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              View Attached File
            </a>
            <div style={{ marginTop: '16px' }}>
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
                onClick={() => setShowConfirmModal(true)}
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
          </div>
        ) : (
          <p>No alert found.</p>
        )}
      </motion.div>

      {}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this alert?</p>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
                <button
                  onClick={handleDelete}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlertDetails;

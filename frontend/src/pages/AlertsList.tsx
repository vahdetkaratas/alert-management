import React, { useEffect, useState } from 'react';
import { getAlerts, deleteAlert } from '../api/alerts';
import { Link } from 'react-router-dom';

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

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id);
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    } catch (err) {
      console.error('Failed to delete alert:', err);
      setError('Failed to delete alert. Please try again.');
    }
  };

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
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
          <li
            key={alert.id}
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
            <br />
            <Link
              to={`/alerts/${alert.id}`}
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: 'green',
                textDecoration: 'none',
              }}
            >
              View Details
            </Link>
            <br />
            <Link
              to={`/alerts/${alert.id}/edit`}
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: 'orange',
                textDecoration: 'none',
              }}
            >
              Edit Alert
            </Link>
            <br />
            <button
              onClick={() => handleDelete(alert.id)}
              style={{
                marginTop: '8px',
                color: 'white',
                backgroundColor: 'red',
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete Alert
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;

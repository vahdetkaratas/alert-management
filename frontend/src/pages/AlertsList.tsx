import React, { useEffect, useState } from 'react';
import { getAlerts } from '../api/alerts';
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

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Alerts List</h1>
      <Link to="/create" style={{ textDecoration: 'none', color: 'blue' }}>
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
            }}
          >
            <h2>{alert.name}</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;

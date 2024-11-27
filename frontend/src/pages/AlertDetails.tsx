import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlertById } from '../api/alerts';

interface Alert {
  id: number;
  name: string;
  age: number;
  fileUrl: string;
}

const AlertDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the alert ID from the URL
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Alert Details</h1>
      {alert ? (
        <div>
          <p><strong>Name:</strong> {alert.name}</p>
          <p><strong>Age:</strong> {alert.age}</p>
          <a
            href={`http://localhost:3001/${alert.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Attached File
          </a>
        </div>
      ) : (
        <p>No alert found.</p>
      )}
    </div>
  );
};

export default AlertDetails;

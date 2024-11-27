import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAlertById, deleteAlert } from '../api/alerts';

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
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Alert Details</h1>
      {alert ? (
        <div>
          <p>
            <strong>Name:</strong> {alert.name}
          </p>
          <p>
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
            }}
          >
            View Attached File
          </a>
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
            onClick={handleDelete}
            style={{
              marginTop: '16px',
              color: 'white',
              backgroundColor: 'red',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Delete Alert
          </button>
        </div>
      ) : (
        <p>No alert found.</p>
      )}
    </div>
  );
};

export default AlertDetails;

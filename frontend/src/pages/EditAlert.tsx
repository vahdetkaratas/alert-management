import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlertById, updateAlert } from '../api/alerts';

interface Alert {
  id: number;
  name: string;
  age: number;
  fileUrl: string;
}

const EditAlert: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const data = await getAlertById(Number(id));
        setAlert(data);
        setName(data.name);
        setAge(String(data.age));
      } catch (err) {
        setError('Failed to load alert details.');
      }
    };

    fetchAlert();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateAlert(Number(id), { name, age: Number(age) });
      navigate(`/alerts/${id}`);
    } catch (err) {
      setError('Failed to update alert. Please try again.');
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!alert) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Alert</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAlert;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlert } from '../api/alerts';

const CreateAlert: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !file) {
      setError('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('file', file);

    try {
      await createAlert(formData);
      setError(null);
      navigate('/'); // Redirect to Alerts List page after success
    } catch (err) {
      setError('Failed to create alert. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create Alert</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <div>
          <label>File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit">Create Alert</button>
      </form>
    </div>
  );
};

export default CreateAlert;

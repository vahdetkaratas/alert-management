import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlertsList from './pages/AlertsList';
import CreateAlert from './pages/CreateAlert';
import AlertDetails from './pages/AlertDetails';
import EditAlert from './pages/EditAlert';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlertsList />} />
        <Route path="/create" element={<CreateAlert />} />
        <Route path="/alerts/:id" element={<AlertDetails />} />
        <Route path="/alerts/:id/edit" element={<EditAlert />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;

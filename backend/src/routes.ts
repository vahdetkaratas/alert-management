import express from 'express';
import multer from 'multer';
import { initializeDatabase } from './database';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Initialize database
const dbPromise = initializeDatabase();

// Create an alert
router.post('/alerts', upload.single('file'), async (req, res) => {
  const { name, age } = req.body;
  const fileUrl = req.file?.path;

  try {
    const db = await dbPromise;
    const result = await db.run(
      `INSERT INTO alerts (name, age, fileUrl) VALUES (?, ?, ?)`,
      [name, age, fileUrl]
    );
    res.json({ id: result.lastID, name, age, fileUrl });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get all alerts
router.get('/alerts', async (req, res) => {
  try {
    const db = await dbPromise;
    const alerts = await db.all(`SELECT * FROM alerts`);
    res.json(alerts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get a single alert
router.get('/alerts/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const alert = await db.get(`SELECT * FROM alerts WHERE id = ?`, [req.params.id]);
    if (alert) res.json(alert);
    else res.status(404).json({ error: 'Alert not found' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update an alert
// Update an alert
router.put('/alerts/:id', async (req, res) => {
    const { name, age } = req.body;
    try {
      const db = await dbPromise;
      const result = await db.run(
        `UPDATE alerts SET name = ?, age = ? WHERE id = ?`,
        [name, age, req.params.id]
      );
      if (result.changes && result.changes > 0) { // Safely check if 'changes' is defined
        res.json({ id: req.params.id, name, age });
      } else {
        res.status(404).json({ error: 'Alert not found' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });
  
  // Delete an alert
  router.delete('/alerts/:id', async (req, res) => {
    try {
      const db = await dbPromise;
      const result = await db.run(`DELETE FROM alerts WHERE id = ?`, [req.params.id]);
      if (result.changes && result.changes > 0) { // Safely check if 'changes' is defined
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Alert not found' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  });
  

export default router;

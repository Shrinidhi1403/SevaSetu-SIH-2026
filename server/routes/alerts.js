import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/alerts
router.get('/', (req, res) => {
  res.json({ success: true, count: store.get('alerts').length, data: store.get('alerts') });
});

// POST /api/alerts/:id/resolve
router.post('/:id/resolve', (req, res) => {
  let alerts = store.get('alerts');
  alerts = alerts.filter(a => a.id !== req.params.id);
  store.set('alerts', alerts);
  res.json({ success: true, message: 'Alert acknowledged and archived' });
});

export default router;

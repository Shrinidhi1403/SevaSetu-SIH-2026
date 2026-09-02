import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/facilities - all health centers
router.get('/', (req, res) => {
  res.json({ success: true, count: store.get('facilities').length, data: store.get('facilities') });
});

// PATCH /api/facilities/:id - update bed occupancy or status
router.patch('/:id', (req, res) => {
  const updated = store.updateById('facilities', req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Facility not found' });
  }
  res.json({ success: true, data: updated });
});

export default router;

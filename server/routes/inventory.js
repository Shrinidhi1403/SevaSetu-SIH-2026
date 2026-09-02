import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/inventory - all medicines
router.get('/', (req, res) => {
  res.json({ success: true, count: store.get('inventory').length, data: store.get('inventory') });
});

// POST /api/inventory/indent - issue digital requisition
router.post('/indent', (req, res) => {
  const { itemId, quantity = 500, facility } = req.body;
  const item = store.findById('inventory', itemId);
  if (item) {
    item.currentStock += parseInt(quantity);
    item.status = item.currentStock <= item.reorderLevel ? 'strained' : 'optimal';
    store.save();
    return res.json({ success: true, message: 'Requisition Indent Issued', data: item });
  }
  res.status(404).json({ success: false, error: 'Medicine not found' });
});

// GET /api/inventory/equipment - medical devices
router.get('/equipment', (req, res) => {
  res.json({ success: true, data: store.get('equipment') });
});

// POST /api/inventory/equipment/:id/service - request biomedical service
router.post('/equipment/:id/service', (req, res) => {
  const updated = store.updateById('equipment', req.params.id, {
    status: "Service Request Dispatched to Biomedical Engineering Team",
    badge: "strained"
  });
  if (!updated) return res.status(404).json({ success: false, error: 'Device not found' });
  res.json({ success: true, message: 'Biomedical service ticket created', data: updated });
});

export default router;

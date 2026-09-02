import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

router.get('/summary', (req, res) => {
  const facilities = store.get('facilities');
  const referrals = store.get('referrals');
  const inventory = store.get('inventory');

  res.json({
    success: true,
    data: {
      activeFacilities: facilities.length,
      criticalEscalations: referrals.filter(r => r.urgency === 'critical').length,
      avgWaitTimeMin: Math.round(facilities.reduce((a, f) => a + f.avgWaitTimeMin, 0) / facilities.length),
      medicineAvailabilityPct: Math.round(facilities.reduce((a, f) => a + f.medicineStockPct, 0) / facilities.length),
      totalBeds: facilities.reduce((a, f) => a + f.bedsTotal, 0),
      occupiedBeds: facilities.reduce((a, f) => a + f.bedsOccupied, 0)
    }
  });
});

router.get('/trends', (req, res) => {
  res.json({ success: true, data: store.get('volumeTrends') });
});

router.get('/maternal', (req, res) => {
  res.json({ success: true, data: store.data.maternalMetrics });
});

router.get('/depletion', (req, res) => {
  res.json({ success: true, data: store.get('depletionTrends') });
});

export default router;

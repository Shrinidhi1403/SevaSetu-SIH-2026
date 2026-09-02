import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/asha/workers
router.get('/workers', (req, res) => {
  res.json({ success: true, data: store.get('ashaWorkers') });
});

// GET /api/asha/uploads
router.get('/uploads', (req, res) => {
  res.json({ success: true, data: store.get('fieldUploads') });
});

// POST /api/asha/visit - log doorstep check-in
router.post('/visit', (req, res) => {
  const { patientName, cluster, vitalsSummary, ashaName } = req.body;
  const newUpload = {
    id: `UPL-${Date.now()}`,
    ashaName: ashaName || "Sunita Bai Kamble",
    cluster: cluster || "Shirwal Cluster",
    patientName: patientName || "Beneficiary",
    type: "ASHA Doorstep Check-in",
    timestamp: "Just now",
    vitalsSummary: vitalsSummary || "Routine vitals recorded",
    syncStatus: "Synced via SevaSetu REST API",
    verified: true,
    photoUrl: null
  };

  store.add('fieldUploads', newUpload);
  res.status(201).json({ success: true, message: "Field visit uploaded successfully", data: newUpload });
});

// POST /api/asha/sync - batch offline sync
router.post('/sync', (req, res) => {
  const { records = [] } = req.body;
  const uploads = store.get('fieldUploads');
  records.forEach(r => {
    uploads.unshift({
      id: `UPL-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      ...r,
      syncStatus: "Batch Synced to Cloud DB",
      verified: true
    });
  });
  store.save();
  res.json({ success: true, message: `Successfully synced ${records.length} records from rural tablet` });
});

// GET /api/asha/outreach - upcoming camps
router.get('/outreach', (req, res) => {
  res.json({ success: true, data: store.get('outreachEvents') });
});

export default router;

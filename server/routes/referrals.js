import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/referrals - list all active emergency referrals
router.get('/', (req, res) => {
  res.json({ success: true, count: store.get('referrals').length, data: store.get('referrals') });
});

// POST /api/referrals - create new escalation
router.post('/', (req, res) => {
  const { patientName, patientAge, patientGender, abhaId, fromFacility, toFacility, urgency, urgencyLabel, specialty, clinicalSummary } = req.body;
  const newRef = {
    id: `REF-2026-${Math.floor(100 + Math.random() * 900)}`,
    patientName: patientName || "Emergency Patient",
    patientAge: patientAge || 45,
    patientGender: patientGender || "Other",
    abhaId: abhaId || "14-0000-0000-0000",
    fromFacility: fromFacility || "Sub-Center Rural",
    toFacility: toFacility || "District Hospital Satara",
    urgency: urgency || "critical",
    urgencyLabel: urgencyLabel || "CRITICAL ESCALATION",
    specialty: specialty || "Emergency Medicine / ICU",
    timeElapsed: "Just now",
    distanceKm: 26,
    etaMinutes: 20,
    ambulanceId: "108 ALS Ambulance MH-12-EM-1081",
    paramedicContact: "+91 99221 44550",
    status: "108 Dispatched",
    clinicalSummary: clinicalSummary || "Acute emergency stabilization required."
  };

  store.add('referrals', newRef);
  res.status(201).json({ success: true, message: "108 Emergency Ambulance Dispatched", data: newRef });
});

// PATCH /api/referrals/:id/dispatch - dispatch ambulance
router.patch('/:id/dispatch', (req, res) => {
  const updated = store.updateById('referrals', req.params.id, {
    status: "108 Ambulance Dispatched",
    ambulanceId: "MH-12-EM-1081 (ALS Active)",
    etaMinutes: 14,
    ...req.body
  });
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Referral not found' });
  }
  res.json({ success: true, message: 'Ambulance dispatched with ALS telemetry', data: updated });
});

export default router;

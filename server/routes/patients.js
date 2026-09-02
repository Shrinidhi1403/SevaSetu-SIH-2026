import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/patients - fetch list with search & filters
router.get('/', (req, res) => {
  const { search, risk, facility } = req.query;
  let patients = store.get('patients');

  if (search) {
    const q = search.toLowerCase();
    patients = patients.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.abhaId.includes(q) ||
      p.village.toLowerCase().includes(q)
    );
  }

  if (risk && risk !== 'all') {
    patients = patients.filter(p => p.riskColor === risk);
  }

  if (facility && facility !== 'all') {
    patients = patients.filter(p => p.primaryPhc === facility);
  }

  res.json({ success: true, count: patients.length, data: patients });
});

// GET /api/patients/:id - single patient with longitudinal record
router.get('/:id', (req, res) => {
  const patient = store.findById('patients', req.params.id);
  if (!patient) {
    return res.status(404).json({ success: false, error: 'Patient ABHA record not found' });
  }
  res.json({ success: true, data: patient });
});

// PATCH /api/patients/:id/vitals - update patient vitals
router.patch('/:id/vitals', (req, res) => {
  const patient = store.findById('patients', req.params.id);
  if (!patient) {
    return res.status(404).json({ success: false, error: 'Patient not found' });
  }

  const { bp, spo2, pulse, bloodSugar, temp, bmi, recordedBy } = req.body;
  const updatedVitals = {
    ...patient.latestVitals,
    ...(bp && { bp }),
    ...(spo2 && { spo2 }),
    ...(pulse && { pulse }),
    ...(bloodSugar && { bloodSugar: `${bloodSugar} mg/dL` }),
    ...(temp && { temp: `${temp} °F` }),
    ...(bmi && { bmi }),
    recordedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by ${recordedBy || 'Field Medical Officer'}`
  };

  patient.latestVitals = updatedVitals;
  if (bp || bloodSugar) {
    patient.vitalsHistory.unshift({
      date: "Today",
      bpSys: parseInt(bp?.split('/')[0]) || 120,
      bpDia: parseInt(bp?.split('/')[1]) || 80,
      sugar: parseInt(bloodSugar) || 120,
      pulse: parseInt(pulse) || 75
    });
  }

  store.save();
  res.json({ success: true, message: 'Vitals updated successfully', data: patient });
});

// POST /api/patients/:id/timeline - append teleconsult/lab/prescription event
router.post('/:id/timeline', (req, res) => {
  const patient = store.findById('patients', req.params.id);
  if (!patient) {
    return res.status(404).json({ success: false, error: 'Patient not found' });
  }

  const { type, title, summary, author, facility, prescription, tags } = req.body;
  const newEvent = {
    id: `EVT-${Date.now()}`,
    type: type || 'teleconsult',
    title: title || 'Clinical Encounter',
    date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    facility: facility || 'PHC Tele-Desk',
    author: author || 'Dr. Ananya Kulkarni',
    summary: summary || 'Clinical notes documented.',
    tags: tags || ['E-Record'],
    prescription: prescription || null
  };

  patient.timeline.unshift(newEvent);
  store.save();

  res.json({ success: true, message: 'Clinical event recorded in ABHA chart', data: newEvent });
});

export default router;

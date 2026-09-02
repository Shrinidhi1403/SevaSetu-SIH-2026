import { Router } from 'express';
import { store } from '../store.js';

const router = Router();

// GET /api/auth/roles - list all selectable roles
router.get('/roles', (req, res) => {
  res.json({ success: true, roles: store.get('roles') });
});

// GET /api/auth/me - current session
router.get('/me', (req, res) => {
  res.json({ success: true, user: store.data.user });
});

// POST /api/auth/login - phone + OTP or role login
router.post('/login', (req, res) => {
  const { roleId, phone, otp } = req.body;
  const roles = store.get('roles');
  const found = roles.find(r => r.id === roleId) || roles[0];

  const user = {
    id: `usr_${found.id}_01`,
    name: found.name,
    role: found.id,
    roleTitle: found.title,
    facility: found.facility,
    district: "Pune Rural Division",
    phone: phone || found.phone,
    email: `${found.id}@health.gov.in`,
    avatar: found.avatar,
    badge: found.title
  };

  store.data.user = user;
  store.save();

  res.json({
    success: true,
    message: "ABHA Unified Authentication Verified",
    token: `seva_jwt_${Date.now()}_${user.id}`,
    user
  });
});

export default router;

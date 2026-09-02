// SevaSetu REST API Client
const BASE_URL = '/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `HTTP Error ${res.status}`);
  }
  return res.json();
};

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      return await handleResponse(res);
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Auth
  login: async (roleId, phone, otp) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleId, phone, otp })
    });
    return handleResponse(res);
  },

  // Patients
  getPatients: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/patients?${query}`);
    return handleResponse(res);
  },

  getPatient: async (id) => {
    const res = await fetch(`${BASE_URL}/patients/${id}`);
    return handleResponse(res);
  },

  updateVitals: async (id, vitalsData) => {
    const res = await fetch(`${BASE_URL}/patients/${id}/vitals`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vitalsData)
    });
    return handleResponse(res);
  },

  addTimelineEvent: async (id, eventData) => {
    const res = await fetch(`${BASE_URL}/patients/${id}/timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return handleResponse(res);
  },

  // Facilities
  getFacilities: async () => {
    const res = await fetch(`${BASE_URL}/facilities`);
    return handleResponse(res);
  },

  // Referrals
  getReferrals: async () => {
    const res = await fetch(`${BASE_URL}/referrals`);
    return handleResponse(res);
  },

  createReferral: async (referralData) => {
    const res = await fetch(`${BASE_URL}/referrals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(referralData)
    });
    return handleResponse(res);
  },

  dispatchAmbulance: async (id, dispatchData = {}) => {
    const res = await fetch(`${BASE_URL}/referrals/${id}/dispatch`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dispatchData)
    });
    return handleResponse(res);
  },

  // Inventory
  getInventory: async () => {
    const res = await fetch(`${BASE_URL}/inventory`);
    return handleResponse(res);
  },

  createIndent: async (indentData) => {
    const res = await fetch(`${BASE_URL}/inventory/indent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(indentData)
    });
    return handleResponse(res);
  },

  getEquipment: async () => {
    const res = await fetch(`${BASE_URL}/inventory/equipment`);
    return handleResponse(res);
  },

  serviceEquipment: async (id) => {
    const res = await fetch(`${BASE_URL}/inventory/equipment/${id}/service`, {
      method: 'POST'
    });
    return handleResponse(res);
  },

  // ASHA
  getAshaWorkers: async () => {
    const res = await fetch(`${BASE_URL}/asha/workers`);
    return handleResponse(res);
  },

  getAshaUploads: async () => {
    const res = await fetch(`${BASE_URL}/asha/uploads`);
    return handleResponse(res);
  },

  logAshaVisit: async (visitData) => {
    const res = await fetch(`${BASE_URL}/asha/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitData)
    });
    return handleResponse(res);
  },

  batchSyncAsha: async (records) => {
    const res = await fetch(`${BASE_URL}/asha/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records })
    });
    return handleResponse(res);
  },

  // Alerts
  getAlerts: async () => {
    const res = await fetch(`${BASE_URL}/alerts`);
    return handleResponse(res);
  },

  resolveAlert: async (id) => {
    const res = await fetch(`${BASE_URL}/alerts/${id}/resolve`, {
      method: 'POST'
    });
    return handleResponse(res);
  }
};

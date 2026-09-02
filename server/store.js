import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'store.json');

// Import initial data from mockData.js
import {
  INITIAL_USER,
  AVAILABLE_ROLES,
  FACILITIES,
  PATIENTS,
  LIVE_REFERRALS,
  SYSTEM_ALERTS,
  INVENTORY_ITEMS,
  EQUIPMENT_ITEMS,
  ASHA_WORKERS,
  RECENT_FIELD_UPLOADS,
  UPCOMING_OUTREACH,
  PATIENT_VOLUME_TRENDS,
  MATERNAL_HEALTH_METRICS,
  DEPLETION_TRENDS
} from '../src/data/mockData.js';

class DataStore {
  constructor() {
    this.data = {
      user: INITIAL_USER,
      roles: AVAILABLE_ROLES,
      facilities: FACILITIES,
      patients: PATIENTS,
      referrals: LIVE_REFERRALS,
      alerts: SYSTEM_ALERTS,
      inventory: INVENTORY_ITEMS,
      equipment: EQUIPMENT_ITEMS,
      ashaWorkers: ASHA_WORKERS,
      fieldUploads: RECENT_FIELD_UPLOADS,
      outreachEvents: UPCOMING_OUTREACH,
      volumeTrends: PATIENT_VOLUME_TRENDS,
      maternalMetrics: MATERNAL_HEALTH_METRICS,
      depletionTrends: DEPLETION_TRENDS
    };

    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
        console.log('[SevaSetu DB] Loaded existing data store from', DATA_FILE);
      } else {
        this.save();
        console.log('[SevaSetu DB] Initialized fresh data store at', DATA_FILE);
      }
    } catch (err) {
      console.error('[SevaSetu DB] Error initializing data file, using memory store:', err.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[SevaSetu DB] Error persisting data store:', err.message);
    }
  }

  get(collection) {
    return this.data[collection] || [];
  }

  set(collection, value) {
    this.data[collection] = value;
    this.save();
    return this.data[collection];
  }

  findById(collection, id) {
    const list = this.get(collection);
    return list.find(item => item.id === id);
  }

  updateById(collection, id, updates) {
    const list = this.get(collection);
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      this.save();
      return list[index];
    }
    return null;
  }

  add(collection, item) {
    const list = this.get(collection);
    list.unshift(item);
    this.save();
    return item;
  }
}

export const store = new DataStore();

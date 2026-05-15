const API_URL = 'http://localhost:3001/api';

// Helper for sending requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('kampus_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || 'Sedang terjadi kesalahan server');
  }

  return data;
};

// ===================================
// Auth Services
// ===================================
export const authService = {
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  register: (name, email, password) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  }),
  getMe: () => request('/auth/me', { method: 'GET' })
};

// ===================================
// CMS Services
// ===================================
export const cmsService = {
  // Pages
  getPages: () => request('/cms/pages', { method: 'GET' }),
  getPage: (id) => request(`/cms/pages/${id}`, { method: 'GET' }),
  createPage: (pageData) => request('/cms/pages', {
    method: 'POST',
    body: JSON.stringify(pageData)
  }),
  updatePage: (id, updates) => request(`/cms/pages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  }),
  deletePage: (id) => request(`/cms/pages/${id}`, { method: 'DELETE' }),

  // Settings
  getSetting: (id) => request(`/cms/settings/${id}`, { method: 'GET' }),
  updateSetting: (id, payload) => request(`/cms/settings/${id}`, {
    method: 'POST',
    body: JSON.stringify({ payload })
  })
};

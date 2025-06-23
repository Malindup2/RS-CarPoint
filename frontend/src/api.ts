const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080/api';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function registerBroker(data: any) {
  const res = await fetch(`${API_BASE}/auth/register-broker`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Users CRUD
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`, { headers: authHeaders() });
  return res.json();
}
export async function getUser(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, { headers: authHeaders() });
  return res.json();
}
export async function createUser(data: any) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function updateUser(id: string, data: any) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteUser(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res;
}

// Vehicles CRUD
export async function getVehicles() {
  const res = await fetch(`${API_BASE}/vehicles`, { headers: authHeaders() });
  return res.json();
}
export async function getVehicle(id: string) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, { headers: authHeaders() });
  return res.json();
}
export async function createVehicle(data: any) {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function updateVehicle(id: string, data: any) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteVehicle(id: string) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res;
}
export async function uploadVehicleImage(id: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/vehicles/${id}/upload-image`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
  return res.json();
}

// Deals CRUD
export async function getDeals(brokerId?: string) {
  const url = brokerId ? `${API_BASE}/deals?brokerId=${brokerId}` : `${API_BASE}/deals`;
  const res = await fetch(url, { headers: authHeaders() });
  return res.json();
}
export async function createDeal(data: any) {
  const res = await fetch(`${API_BASE}/deals`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
} 
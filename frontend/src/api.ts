import { toast } from 'react-toastify';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8082/api';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  if (res.status === 403) {
    toast.error('Access forbidden: You do not have permission to perform this action.');
    throw new Error('Forbidden');
  }
  if (!res.ok) {
    const text = await res.text();
    toast.error(`Error: ${text || res.statusText}`);
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
}

export async function registerBroker(data: any) {
  const res = await fetch(`${API_BASE}/auth/register-broker`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

// Users CRUD
export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`, { headers: authHeaders() });
  return handleResponse(res);
}
export async function getUser(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, { headers: authHeaders() });
  return handleResponse(res);
}
export async function createUser(data: any) {
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}
export async function updateUser(id: string, data: any) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}
export async function deleteUser(id: string) {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return handleResponse(res);
}

// Vehicles CRUD
export async function getVehicles() {
  const res = await fetch(`${API_BASE}/vehicles`, { headers: authHeaders() });
  return handleResponse(res);
}
export async function getVehicle(id: string) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, { headers: authHeaders() });
  return handleResponse(res);
}
export async function createVehicle(data: any) {
  const res = await fetch(`${API_BASE}/vehicles`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}
export async function updateVehicle(id: string, data: any) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}
export async function deleteVehicle(id: string) {
  const res = await fetch(`${API_BASE}/vehicles/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return handleResponse(res);
}
export async function uploadVehicleImage(id: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/vehicles/${id}/upload-image`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
  return handleResponse(res);
}

// Deals CRUD
export async function getDeals(brokerId?: string) {
  const url = brokerId ? `${API_BASE}/deals?brokerId=${brokerId}` : `${API_BASE}/deals`;
  const res = await fetch(url, { headers: authHeaders() });
  return handleResponse(res);
}
export async function createDeal(data: any) {
  const res = await fetch(`${API_BASE}/deals`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}


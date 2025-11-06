import { api, setToken } from './http';
import { AppUser, BackendRole, mapRole } from './types';

interface LoginResponseRaw {
  token?: string;
  access_token?: string;
  user?: { id: number | string; email: string; role: BackendRole };
}

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponseRaw>('/users/login', { user: { email, password } });
  const token = data.token || data.access_token || '';
  if (token) setToken(token);
  const user: AppUser = {
    id: data.user?.id || '',
    email: data.user?.email || email,
    role: mapRole(data.user?.role || 'customer'),
  };
  return { token, user };
}

export async function createUser(email: string, password: string, role: BackendRole = 'customer') {
  const { data } = await api.post('/users', { user: { email, password, role } });
  return data;
}

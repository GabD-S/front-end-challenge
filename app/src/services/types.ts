export type AppRole = 'usuario' | 'professor' | 'admin';
export type BackendRole = 'customer' | 'teacher' | 'admin';

export interface AppUser {
  id: string | number;
  email: string;
  role: AppRole;
}

export function mapRole(r: BackendRole): AppRole {
  if (r === 'teacher') return 'professor';
  if (r === 'customer') return 'usuario';
  return 'admin';
}

import { api } from './http';

export interface GymClass {
  id: number;
  name: string;
  description?: string;
  teacher_name?: string;
  start_time?: string; // e.g. '08:00'
  duration?: number; // minutes
  category_id?: number;
}

export async function listClasses(): Promise<GymClass[]> {
  const { data } = await api.get<GymClass[]>('/gym_classes');
  return data;
}

export async function showClass(id: number): Promise<GymClass> {
  const { data } = await api.get<GymClass>(`/gym_classes/${id}`);
  return data;
}

export async function createClass(payload: Partial<GymClass>): Promise<GymClass> {
  const { data } = await api.post<GymClass>('/gym_classes', { gym_class: payload });
  return data;
}

export async function updateClass(id: number, payload: Partial<GymClass>): Promise<GymClass> {
  const { data } = await api.patch<GymClass>(`/gym_classes/${id}`, { gym_class: payload });
  return data;
}

export async function deleteClass(id: number): Promise<void> {
  await api.delete(`/gym_classes/${id}`);
}

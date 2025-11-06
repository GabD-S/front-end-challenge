import { api } from './http';

export interface GymClassUser {
  id: number;
  user_id: number;
  gym_class_id: number;
}

// Enroll user into class (backend should infer user via token)
export async function enroll(gym_class_id: number): Promise<GymClassUser> {
  const { data } = await api.post<GymClassUser>('/gym_class_users', { gym_class_user: { gym_class_id } });
  return data;
}

// Unenroll by association id
export async function unenroll(gym_class_user_id: number): Promise<void> {
  await api.delete(`/gym_class_users/${gym_class_user_id}`);
}

// Mock: Listagem de aulas
const AULAS_KEY = 'MOCK_AULAS';
export type Aula = {
  id: string;
  nome: string;
  professor: string;
  horario: string;
  dias: string[];
  descricao: string;
  imagem?: string;
};

// Dados mockados iniciais
const MOCK_AULAS: Aula[] = [
  {
    id: '1',
    nome: 'Musculação',
    professor: 'João Silva',
    horario: '08:00 - 09:00',
    dias: ['Segunda', 'Quarta', 'Sexta'],
    descricao: 'Treinamento de força e resistência com acompanhamento profissional.',
    imagem: '',
  },
  {
    id: '2',
    nome: 'Yoga',
    professor: 'Maria Souza',
    horario: '10:00 - 11:00',
    dias: ['Terça', 'Quinta'],
    descricao: 'Aula de Yoga para relaxamento, flexibilidade e equilíbrio.',
    imagem: '',
  },
  {
    id: '3',
    nome: 'Pilates',
    professor: 'Carlos Lima',
    horario: '14:00 - 15:00',
    dias: ['Segunda', 'Quinta'],
    descricao: 'Pilates solo para fortalecimento do core e postura.',
    imagem: '',
  },
];

export async function getAulas(): Promise<Aula[]> {
  let aulasRaw = await AsyncStorage.getItem(AULAS_KEY);
  if (!aulasRaw) {
    // Primeira execução: salva mock
    await AsyncStorage.setItem(AULAS_KEY, JSON.stringify(MOCK_AULAS));
    aulasRaw = JSON.stringify(MOCK_AULAS);
  }
  return JSON.parse(aulasRaw);
}

import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para armazenar usuários
const USERS_KEY = 'MOCK_USERS';

// Função utilitária para gerar token fake
function generateToken(email: string) {
  return btoa(email + ':' + Date.now());
}

export type User = {
  id: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};


export type SignInPayload = {
  email: string;
  password: string;
};


export type SignUpPayload = {
  email: string;
  password: string;
};


// Mock: Cadastro local
export async function signUpRequest(data: SignUpPayload): Promise<AuthResponse> {
  const usersRaw = await AsyncStorage.getItem(USERS_KEY);
  const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
  const exists = users.find(u => u.email === data.email);
  if (exists) {
    throw new Error('E-mail já cadastrado.');
  }
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 12),
    email: data.email,
  };
  users.push(newUser);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Simula login automático após cadastro
  return {
    token: generateToken(data.email),
    user: newUser,
  };
}

// Mock: Login local
export async function signInRequest(data: SignInPayload): Promise<AuthResponse> {
  const usersRaw = await AsyncStorage.getItem(USERS_KEY);
  const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];
  const user = users.find(u => u.email === data.email);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  // Não valida senha (mock simples)
  return {
    token: generateToken(data.email),
    user,
  };
}

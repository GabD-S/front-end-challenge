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
  // Campos adicionais para reserva/inscrição
  categoria?: 'yoga' | 'crossfit' | 'pilates' | 'hiit' | 'musculacao' | string;
  nivel?: string;
  vagas?: number; // vagas restantes
  inscritos?: string[]; // lista de e-mails dos alunos
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
    categoria: 'musculacao',
    nivel: 'Todos os níveis',
    vagas: 12,
    inscritos: [],
  },
  {
    id: '2',
    nome: 'Yoga',
    professor: 'Maria Souza',
    horario: '10:00 - 11:00',
    dias: ['Terça', 'Quinta'],
    descricao: 'Aula de Yoga para relaxamento, flexibilidade e equilíbrio.',
    imagem: '',
    categoria: 'yoga',
    nivel: 'Intermediário',
    vagas: 8,
    inscritos: [],
  },
  {
    id: '3',
    nome: 'Pilates',
    professor: 'Carlos Lima',
    horario: '14:00 - 15:00',
    dias: ['Segunda', 'Quinta'],
    descricao: 'Pilates solo para fortalecimento do core e postura.',
    imagem: '',
    categoria: 'pilates',
    nivel: 'Todos os níveis',
    vagas: 10,
    inscritos: [],
  },
];

// Cache em memória para respostas rápidas entre telas
type CacheEntry<T> = { value: T; timestamp: number };
const memoryCache: Record<string, CacheEntry<any>> = {};
const CACHE_TTL_MS = 60_000; // 60s

function cacheGet<T>(key: string, ttl = CACHE_TTL_MS): T | undefined {
  const hit = memoryCache[key];
  if (!hit) return undefined;
  if (Date.now() - hit.timestamp > ttl) {
    delete memoryCache[key];
    return undefined;
  }
  return hit.value as T;
}

function cacheSet<T>(key: string, value: T) {
  memoryCache[key] = { value, timestamp: Date.now() };
}

export async function getAulas(): Promise<Aula[]> {
  const cacheKey = 'aulas:list';
  const cached = cacheGet<Aula[]>(cacheKey);
  if (cached) return cached;

  // Busca local imediata (AsyncStorage) para retorno rápido
  let aulasRaw = await AsyncStorage.getItem(AULAS_KEY);
  if (!aulasRaw) {
    await AsyncStorage.setItem(AULAS_KEY, JSON.stringify(MOCK_AULAS));
    aulasRaw = JSON.stringify(MOCK_AULAS);
  }
  const localParsed: Aula[] = JSON.parse(aulasRaw).map((a: Aula) => ({
    ...a,
    categoria: a.categoria || inferCategoria(a.nome),
    nivel: a.nivel || 'Todos os níveis',
    inscritos: Array.isArray(a.inscritos) ? a.inscritos : [],
    vagas: typeof a.vagas === 'number' ? a.vagas : 10,
  }));
  cacheSet(cacheKey, localParsed);

  // Revalidação em background (não bloqueia a UI)
  listClasses()
    .then((remote) => {
      const mapped = remote.map(gc => ({
        id: String(gc.id),
        nome: gc.name,
        professor: gc.teacher_name || 'Professor',
        horario: gc.start_time || '08:00 - 09:00',
        dias: [],
        descricao: gc.description || '',
        imagem: '',
        categoria: inferCategoria(gc.name),
        nivel: 'Todos os níveis',
        vagas: 10,
        inscritos: [],
      }));
      cacheSet(cacheKey, mapped);
      AsyncStorage.setItem(AULAS_KEY, JSON.stringify(mapped)).catch(() => {});
    })
    .catch(() => {
  // mantém localParsed no cache
    });

  return localParsed;
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { listClasses, showClass, createClass, deleteClass as remoteDelete } from '@/src/services/classes.api';

// Chave para armazenar usuários
const USERS_KEY = 'MOCK_USERS';

// Função utilitária para gerar token fake
function generateToken(email: string) {
  return btoa(email + ':' + Date.now());
}

export type User = {
  id: string;
  email: string;
  role: 'usuario' | 'professor' | 'admin';
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
  role?: 'usuario' | 'professor' | 'admin';
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
    role: data.role || 'usuario',
  };
  users.push(newUser);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Simula login automático após cadastro
  return {
    token: generateToken(data.email),
    user: newUser,
  };
}

// ---- Feedbacks ----
const FEEDBACKS_KEY = 'MOCK_FEEDBACKS';

export type Feedback = {
  id: string;
  userEmail: string;
  text: string;
  rating: number; // 1..5
  createdAt: number;
};

export async function getFeedbacks(): Promise<Feedback[]> {
  const raw = await AsyncStorage.getItem(FEEDBACKS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export async function addFeedback(fb: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> {
  const list = await getFeedbacks();
  const item: Feedback = { id: Math.random().toString(36).slice(2), createdAt: Date.now(), ...fb };
  list.unshift(item);
  await AsyncStorage.setItem(FEEDBACKS_KEY, JSON.stringify(list));
  return item;
}

// Utilitário para inferir categoria por nome
function inferCategoria(nome: string): Aula['categoria'] {
  const n = (nome || '').toLowerCase();
  if (n.includes('yoga')) return 'yoga';
  if (n.includes('pilates')) return 'pilates';
  if (n.includes('hiit')) return 'hiit';
  if (n.includes('cross')) return 'crossfit';
  if (n.includes('muscul')) return 'musculacao';
  return 'musculacao';
}

// Atualiza a coleção de aulas
async function setAulas(aulas: Aula[]) {
  await AsyncStorage.setItem(AULAS_KEY, JSON.stringify(aulas));
}

// Busca aula por ID
export async function getAulaById(id: string): Promise<Aula | undefined> {
  // 1) Primeiro, tenta cache em memória/dados locais
  const listCached = cacheGet<Aula[]>('aulas:list');
  if (listCached) {
    const hit = listCached.find(a => a.id === id);
    if (hit) return hit;
  }
  const local = (await getAulas()).find(a => a.id === id);
  if (local) return local;

  // 2) Tenta remoto (não bloqueia outras telas, mas aqui precisamos do retorno)
  try {
    const gc = await showClass(Number(id));
    const aula: Aula = {
      id: String(gc.id),
      nome: gc.name,
      professor: gc.teacher_name || 'Professor',
      horario: gc.start_time || '08:00 - 09:00',
      dias: [],
      descricao: gc.description || '',
      imagem: '',
      categoria: inferCategoria(gc.name),
      nivel: 'Todos os níveis',
      vagas: 10,
      inscritos: [],
    };
    return aula;
  } catch {
    return undefined;
  }
}

// Inscreve um usuário (email) na aula, respeitando limite de vagas e evitando duplicidade
export async function enrollInAula(aulaId: string, userEmail: string): Promise<Aula> {
  if (!userEmail) throw new Error('Usuário não autenticado.');
  const aulas = await getAulas();
  const idx = aulas.findIndex((a) => a.id === aulaId);
  if (idx === -1) throw new Error('Aula não encontrada.');
  const aula = aulas[idx];
  const inscritos = new Set(aula.inscritos ?? []);
  if (inscritos.has(userEmail)) {
  // Já inscrito: retorna sem alterar vagas
    return aula;
  }
  const vagasRestantes = typeof aula.vagas === 'number' ? aula.vagas : 0;
  if (vagasRestantes <= 0) {
    throw new Error('Não há vagas disponíveis.');
  }
  const updated: Aula = {
    ...aula,
    inscritos: [...inscritos, userEmail] as string[],
    vagas: vagasRestantes - 1,
  };
  aulas[idx] = updated;
  await setAulas(aulas);
  return updated;
}

// Cancela inscrição (opcional utilitário)
export async function unenrollFromAula(aulaId: string, userEmail: string): Promise<Aula> {
  const aulas = await getAulas();
  const idx = aulas.findIndex((a) => a.id === aulaId);
  if (idx === -1) throw new Error('Aula não encontrada.');
  const aula = aulas[idx];
  const before = new Set(aula.inscritos ?? []);
  if (!before.has(userEmail)) return aula;
  before.delete(userEmail);
  const updated: Aula = {
    ...aula,
    inscritos: Array.from(before),
    vagas: (aula.vagas ?? 0) + 1,
  };
  aulas[idx] = updated;
  await setAulas(aulas);
  return updated;
}

// Remove uma aula por ID (admin/professor)
export async function deleteAula(aulaId: string): Promise<void> {
  try {
    await remoteDelete(Number(aulaId));
  } catch {
    const aulas = await getAulas();
    const filtered = aulas.filter(a => a.id !== aulaId);
    await setAulas(filtered);
  }
}

// Cria uma nova aula (admin/professor)
export type CreateAulaPayload = {
  nome: string;
  professor: string;
  horario: string;
  dias: string[];
  descricao: string;
  imagem?: string;
  categoria?: Aula['categoria'];
  nivel?: string;
  vagas?: number;
};

export async function createAula(payload: CreateAulaPayload): Promise<Aula> {
  try {
    const created = await createClass({
      name: payload.nome,
      description: payload.descricao,
      teacher_name: payload.professor,
      start_time: payload.horario.split(' - ')[0],
    });
    return {
      id: String(created.id),
      nome: created.name,
      professor: created.teacher_name || payload.professor,
      horario: payload.horario,
      dias: payload.dias,
      descricao: created.description || payload.descricao,
      imagem: payload.imagem || '',
      categoria: payload.categoria || inferCategoria(created.name),
      nivel: payload.nivel || 'Todos os níveis',
      vagas: typeof payload.vagas === 'number' ? payload.vagas : 10,
      inscritos: [],
    };
  } catch {
    const aulas = await getAulas();
    const nova: Aula = {
      id: Math.random().toString(36).slice(2),
      nome: payload.nome,
      professor: payload.professor,
      horario: payload.horario,
      dias: Array.isArray(payload.dias) ? payload.dias : [],
      descricao: payload.descricao,
      imagem: payload.imagem || '',
      categoria: payload.categoria || inferCategoria(payload.nome),
      nivel: payload.nivel || 'Todos os níveis',
      vagas: typeof payload.vagas === 'number' ? payload.vagas : 10,
      inscritos: [],
    };
    await setAulas([...aulas, nova]);
    return nova;
  }
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

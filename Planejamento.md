Switch Dreams Challenge - Fit Dreams App (React Native)
Este repositório contém a solução para o desafio de frontend da Switch Dreams, focado no desenvolvimento de um aplicativo mobile para a academia Fit Dreams usando React Native e Expo.

O objetivo é consumir uma API RESTful fornecida para criar uma interface de usuário funcional, intuitiva e de qualidade.

Links de Entrega
Link do Expo Publish: [AINDA A SER INSERIDO - LINK DO EXPO AQUI]

Vídeo Demonstrativo: [AINDA A SER INSERIDO - LINK DO VÍDEO AQUI]

📋 Índice
Tecnologias Utilizadas






✨ Tecnologias Utilizadas
React Native: Framework principal para o desenvolvimento.

Expo: Ferramenta para build, deploy e gerenciamento do projeto.

JavaScript (ES6+): Linguagem base.

React Navigation: Para gerenciamento de rotas e navegação entre telas.

Axios: (Ou fetch) Para realizar as requisições HTTP à API.

AsyncStorage: Para persistência local do token de autenticação.

(Diferencial) Jest & React Native Testing Library: Para testes unitários e de integração.

# Switch Dreams Challenge - Fit Dreams App (React Native)

Este repositório contém a solução para o desafio de frontend da Switch Dreams, focado no desenvolvimento de um aplicativo mobile para a academia Fit Dreams usando React Native e Expo. O objetivo é consumir uma API RESTful para criar uma interface funcional, intuitiva e de qualidade.

## Links de Entrega

- Expo Publish: [A INSERIR]
- Vídeo Demonstrativo: [A INSERIR]

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Telas Desenvolvidas](#telas-desenvolvidas)
- [Informações da API](#informações-da-api)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Plano de Ações e Desenvolvimento](#plano-de-ações-e-desenvolvimento)

## Tecnologias Utilizadas

- React Native: framework principal para o desenvolvimento
- Expo: build, deploy e gerenciamento do projeto
- JavaScript (ES6+) ou TypeScript
- React Navigation: rotas e navegação entre telas
- Axios (ou fetch): requisições HTTP
- AsyncStorage: persistência local do token de autenticação
- Diferenciais:
  - Jest & React Native Testing Library (testes unitários e de integração)
  - ESLint / Prettier (qualidade e padronização de código)
  - Figma (prototipação) — [inserir link do protótipo, se houver]

## Funcionalidades Implementadas

### Sistema de Autenticação

- [ ] Cadastro de novos usuários (POST /users)
- [ ] Login de usuários (POST /login)
- [ ] Gerenciamento de token JWT (salvar no AsyncStorage e enviar em headers)

### Navegação Protegida

- [ ] Separar rotas públicas (Login, Cadastro) e privadas (App)
- [ ] Redirecionar para Home se já houver token válido

### Gerenciamento de Aulas

- [ ] Listagem de aulas (GET /aulas)
- [ ] Detalhes de uma aula (GET /aulas/:id)
- [ ] Edição dos dados da aula (PUT /aulas/:id)

### Feedback ao Usuário

- [ ] Indicadores de loading durante chamadas de API
- [ ] Tratamento e exibição de mensagens de erro (ex.: "Usuário ou senha inválidos")

## Telas Desenvolvidas

Fluxo composto pelas 5 telas obrigatórias:

- [ ] Tela de Cadastro (SignUp)
- [ ] Tela de Login (Login)
- [ ] Tela de Aulas (Index / Home)
- [ ] Tela de Detalhes da Aula (Show)
- [ ] Tela de Edição da Aula (Edit)

## Informações da API

Toda a lógica de negócios e dados são fornecidos pela API da Fit Dreams.

- URL Base: https://gym.switchdreams.com.br/
- Documentação (Postman): https://documenter.getpostman.com/view/12265896/Uz59MeAK#57d01a84-2799-4754-a891-7f08936f2a5e

## Como Executar o Projeto

Pré-requisitos: Node.js LTS, npm/yarn e Expo Go (no dispositivo móvel) ou emulador Android/iOS.

1. Clonar (após fazer o fork):
	```bash
	git clone <seu-fork>
	cd <pasta-do-projeto>/Switch_Dreams_frontend
	```
2. Inicializar (se ainda não houver um projeto Expo nesta pasta):
	```bash
	npx create-expo-app@latest .
	```
3. Instalar dependências:
	```bash
	npm install
	```
4. Iniciar o servidor de desenvolvimento:
	```bash
	npx expo start
	```
5. Acessar o app:
	- Escaneie o QR Code com o app Expo Go (Android/iOS)
	- Ou pressione `w` no terminal para abrir no emulador web

## Plano de Ações e Desenvolvimento

### Fase 0: Setup e Estrutura

- [ ] Fazer o fork do repositório oficial
- [ ] Criar um novo projeto Expo (npx create-expo-app)
- [ ] (Diferencial) Configurar ESLint, Prettier e EditorConfig
- [ ] Criar a estrutura de pastas (ex.: src/screens, src/components, src/services, src/navigation, src/contexts)

### Fase 1: Navegação e Telas

- [ ] Instalar e configurar o React Navigation
- [ ] Criar um Stack Navigator principal
- [ ] Criar componentes/telas base (LoginScreen, SignUpScreen, etc.)
- [ ] Configurar a navegação inicial (Login → Home, Cadastrar → Cadastro)

### Fase 2: Autenticação e Contexto

- [ ] Criar `src/services/api` (Axios com baseURL)
- [ ] Implementar UI de Login e Cadastro (inputs, botões)
- [ ] Implementar `handleLogin` e `handleSignUp` (chamadas à API)
- [ ] Salvar token JWT no AsyncStorage
- [ ] (Recomendado) Criar `AuthContext` (token, usuário, isLoading)
- [ ] Navegação protegida: abrir Home se logado; Login se não logado

### Fase 3: Funcionalidades Core (Aulas)

- [ ] Index: buscar (GET /aulas), loading, FlatList, navegação para Show
- [ ] Show: buscar (GET /aulas/:id), exibir imagem/descrição/professor/…
- [ ] Edit: formulário pré-preenchido, PUT /aulas/:id, voltar para Show/Index

### Fase 4: Polimento e Entrega

- [ ] (Diferencial) Testes com Jest (funções críticas e componentes)
- [ ] Revisar UI/UX, adicionar ActivityIndicator e tratar erros
- [ ] Gravar vídeo do fluxo (Login, Index, Show, Edit)
- [ ] Publicar via Expo (`npx expo publish`)
- [ ] Atualizar README com links do vídeo e do Publish
- [ ] Abrir Pull Request no repositório original
# Switch Dreams Challenge — Fit Dreams App (React Native)

Este repositório contém a solução para o desafio de frontend da Switch Dreams, focado no desenvolvimento de um aplicativo mobile para a academia Fit Dreams usando React Native e Expo.

O objetivo é consumir uma API RESTful fornecida para criar uma interface de usuário funcional, intuitiva e de qualidade.

## 🔗 Links de Entrega

- Link do Expo Publish: [INSERIR LINK AQUI]
- Vídeo Demonstrativo: [INSERIR LINK AQUI]

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Telas Desenvolvidas](#-telas-desenvolvidas)
- [Informações da API](#-informações-da-api)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Plano de Ações e Desenvolvimento](#-plano-de-ações-e-desenvolvimento)

## ✨ Tecnologias Utilizadas

- React Native — Framework principal para o desenvolvimento
- Expo — Ferramenta para build, deploy e gerenciamento do projeto
- JavaScript (ES6+)
- React Navigation — Gerenciamento de rotas e navegação entre telas
- Axios (ou Fetch) — Requisições HTTP à API
- AsyncStorage — Persistência local do token de autenticação
- Diferenciais:
	- Jest & React Native Testing Library — Testes unitários e de integração
	- ESLint / Prettier — Padronização e qualidade de código
	- Figma — Prototipação (link do protótipo: [se aplicável])

## 🚀 Funcionalidades Implementadas

- [x] Sistema de Autenticação
	- Cadastro de novos usuários (mock local via AsyncStorage)
	- Login de usuários (mock local via AsyncStorage)
	- Gerenciamento de token (AsyncStorage)
- [x] Navegação Protegida
	- Rotas públicas (Login, Cadastro) e privadas (App)
	- Redirecionamento automático para Home se houver token válido
- [x] Gerenciamento de Aulas
	- Listagem de todas as aulas (mock local via AsyncStorage)
	- Detalhes de uma aula (mock local via AsyncStorage)
	- Edição de aula (mock local via AsyncStorage)
- [x] Feedback ao Usuário
	- Indicadores de loading durante operações locais
	- Exibição de mensagens de erro (ex.: “Usuário ou senha inválidos”)

## 📱 Telas Desenvolvidas

- [x] Tela de Cadastro (SignUp)
- [x] Tela de Login (Login)
- [x] Tela de Aulas (Index / Home)
- [x] Tela de Detalhes da Aula (Show)
- [x] Tela de Edição da Aula (Edit)

## 🔗 Informações da API

- URL Base: https://gym.switchdreams.com.br/
- Documentação (Postman): [INSERIR LINK AQUI]

## 💻 Como Executar o Projeto

Pré‑requisitos:
- Node.js (LTS)
- App Expo Go instalado no dispositivo móvel (iOS/Android)

Passos:
1) Clone o repositório (após fazer o fork):

```bash
git clone <URL-DO-SEU-FORK>
cd front-end-challenge
```

2) Instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
```

3) Inicie o servidor de desenvolvimento do Expo:

```bash
npx expo start
```

4) Acesse o aplicativo:
- Escaneie o QR Code no terminal com o app Expo Go (iOS/Android)
- Ou pressione `w` no terminal para abrir no emulador web

## ✅ Plano de Ações e Desenvolvimento

Este é o checklist detalhado que guiará o desenvolvimento do projeto, com o desenvolvimento das telas integrado em cada fase.

### Fase 0: Setup e Estrutura do Projeto

- [x] Fazer o fork do repositório oficial
- [x] Iniciar um novo projeto Expo (`npx create-expo-app`) — criado em `app/` dentro do repositório
- [x] (Diferencial) Configurar ESLint, Prettier e EditorConfig — `.eslintrc.js`, `.prettierrc`, `.prettierignore`, `.eslintignore`, `.editorconfig` adicionados em `app/`
- [x] Criar estrutura de pastas (ex.: `src/screens`, `src/components`, `src/services`, `src/navigation`, `src/contexts`) — criadas em `app/src/*`

### Fase 1: Telas de Autenticação (UI e Navegação)

Objetivo: Construir a parte visual e a navegação inicial das telas públicas.

 - [x] Instalar e configurar o React Navigation
 - [x] Criar um Stack Navigator para o fluxo de autenticação
 - [x] Tela de Login (`LoginScreen`)
	- [x] Inputs para email e senha
	- [x] Botão “Entrar”
	- [x] Link/botão para navegar para “Cadastro”
 - [x] Tela de Cadastro (`SignUpScreen`)
	- [x] Inputs para dados do usuário
	- [x] Botão “Cadastrar”
	- [x] Link/botão para voltar ao “Login”
 - [x] Conectar navegação entre Login e Cadastro

### Fase 2: Lógica de Autenticação e Contexto

Objetivo: Tornar as telas de Login e Cadastro funcionais e gerenciar o estado do usuário.

- [x] Criar serviço de API (`src/services/api.ts`) com Axios e `baseURL` (padrão: `https://gym.switchdreams.com.br/`, sobrescrevível via `EXPO_PUBLIC_API_URL`)
- [x] Implementar `handleLogin` e `handleSignUp` (endpoints configuráveis; por padrão `/auth/login` e `/auth/register`)
- [x] Conectar as funções aos botões “Entrar” e “Cadastrar”
- [x] Salvar token com AsyncStorage após login
- [x] Criar `AuthContext` para estado global (token, usuário, loading)
- [x] Implementar Navegação Protegida: verificação inicial do token com loader e redirecionamento automático (Login ↔ Home)

### Fase 3: Tela de Listagem de Aulas (Index)

Objetivo: Construir a tela principal após o login.

 - [x] Tela de Aulas (`IndexScreen`)
	 - [x] Header/título
	 - [x] `FlatList` para a lista (com dados mockados)
	 - [x] Componente reutilizável (`ListItem`) com nome e professor
 - [x] Lógica
	 - [x] `useEffect` para buscar aulas (mock local)
	 - [x] `ActivityIndicator` durante o loading
	 - [x] Popular a `FlatList` com os dados mockados
	 - [x] Cada item navega para “Detalhes” com `id` via params

### Fase 4: Telas de Detalhes e Edição da Aula

Objetivo: Permitir visualização detalhada e edição de uma aula.

- [x] Tela de Detalhes (`ShowScreen`)
	- [x] Exibir imagem de capa (placeholder)
	- [x] Mostrar: nome, professor, horário, dias da semana, descrição
	- [x] Botão “Editar Aula”
- [x] Lógica da Tela de Detalhes
	- [x] Obter `id` via `route.params`
	- [x] Buscar dados da aula localmente
	- [x] Navegar para detalhes ao clicar em uma aula na lista
	- [x] Navegar para “Edição” passando o objeto da aula para pré-preenchimento
- [x] Tela de Edição (`EditScreen`)
	- [x] Formulário com `TextInput` para campos editáveis
	- [x] Botão “Salvar Alterações”
- [x] Lógica da Tela de Edição
	- [x] Receber dados via `route.params`
	- [x] Atualizar aula localmente (AsyncStorage)
	- [x] Voltar para “Detalhes” após sucesso

### Fase 5: Finalização e Entrega

- [ ] (Diferencial) Testes com Jest/RTL para componentes/fluxos críticos
- [ ] Revisão de UX: indicadores de loading e mensagens de erro consistentes
- [ ] Gravar vídeo demonstrativo do fluxo completo
- [ ] Publicar com Expo (`npx expo publish`)
- [ ] Atualizar este documento com os links do vídeo e do publish
- [ ] Abrir Pull Request para o repositório original do desafio


link para o figma 

https://www.figma.com/design/9qOZZSKQJdc99dImkAMP6g/Untitled?node-id=0-1&t=h5FwO7E0tpzJjsUN-1
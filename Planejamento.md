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

- [ ] Sistema de Autenticação
	- Cadastro de novos usuários (POST `/users`)
	- Login de usuários (POST `/login`)
	- Gerenciamento de token JWT (salvar no AsyncStorage e enviar nos headers)
- [ ] Navegação Protegida
	- Rotas públicas (Login, Cadastro) e privadas (App)
	- Redirecionamento automático para Home se houver token válido
- [ ] Gerenciamento de Aulas
	- Listagem de todas as aulas (GET `/aulas`)
	- Detalhes de uma aula (GET `/aulas/:id`)
	- Edição de aula (PUT `/aulas/:id`)
- [ ] Feedback ao Usuário
	- Indicadores de loading durante chamadas de API
	- Exibição de mensagens de erro (ex.: “Usuário ou senha inválidos”)

## 📱 Telas Desenvolvidas

- [ ] Tela de Cadastro (SignUp)
- [ ] Tela de Login (Login)
- [ ] Tela de Aulas (Index / Home)
- [ ] Tela de Detalhes da Aula (Show)
- [ ] Tela de Edição da Aula (Edit)

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

- [ ] Fazer o fork do repositório oficial
- [ ] Iniciar um novo projeto Expo (`npx create-expo-app`)
- [ ] (Diferencial) Configurar ESLint, Prettier e EditorConfig
- [ ] Criar estrutura de pastas (ex.: `src/screens`, `src/components`, `src/services`, `src/navigation`, `src/contexts`)

### Fase 1: Telas de Autenticação (UI e Navegação)

Objetivo: Construir a parte visual e a navegação inicial das telas públicas.

- [ ] Instalar e configurar o React Navigation
- [ ] Criar um Stack Navigator para o fluxo de autenticação
- [ ] Tela de Login (`LoginScreen`)
	- [ ] Inputs para email e senha
	- [ ] Botão “Entrar”
	- [ ] Link/botão para navegar para “Cadastro”
- [ ] Tela de Cadastro (`SignUpScreen`)
	- [ ] Inputs para dados do usuário
	- [ ] Botão “Cadastrar”
	- [ ] Link/botão para voltar ao “Login”
- [ ] Conectar navegação entre Login e Cadastro

### Fase 2: Lógica de Autenticação e Contexto

Objetivo: Tornar as telas de Login e Cadastro funcionais e gerenciar o estado do usuário.

- [ ] Criar serviço de API (`src/services/api.ts|js`) com Axios e `baseURL`
- [ ] Implementar `handleLogin` e `handleSignUp` (POST `/login`, POST `/users`)
- [ ] Conectar as funções aos botões “Entrar” e “Cadastrar”
- [ ] Salvar token com AsyncStorage após login
- [ ] Criar `AuthContext` para estado global (token, usuário, loading)
- [ ] Implementar Navegação Protegida: verificar token no início e direcionar para Home ou Login

### Fase 3: Tela de Listagem de Aulas (Index)

Objetivo: Construir a tela principal após o login.

- [ ] Tela de Aulas (`IndexScreen`)
	- [ ] Header/título
	- [ ] `FlatList` para a lista
	- [ ] Componente reutilizável (ex.: `AulaCard`/`ListItem`) com imagem, nome e professor
- [ ] Lógica
	- [ ] `useEffect` para buscar aulas (GET `/aulas`) com token nos headers
	- [ ] `ActivityIndicator` durante o loading
	- [ ] Popular a `FlatList` com os dados
	- [ ] Cada item deve navegar para “Detalhes” com `id` via params

### Fase 4: Telas de Detalhes e Edição da Aula

Objetivo: Permitir visualização detalhada e edição de uma aula.

- [ ] Tela de Detalhes (`ShowScreen`)
	- [ ] Exibir imagem de capa
	- [ ] Mostrar: nome, professor, horário, dias da semana, descrição
	- [ ] Botão “Editar Aula”
- [ ] Lógica da Tela de Detalhes
	- [ ] Obter `id` via `route.params`
	- [ ] GET `/aulas/:id` para informações completas
	- [ ] Navegar para “Edição” passando o objeto da aula para pré-preenchimento
- [ ] Tela de Edição (`EditScreen`)
	- [ ] Formulário com `TextInput` para campos editáveis
	- [ ] Botão “Salvar Alterações”
- [ ] Lógica da Tela de Edição
	- [ ] Receber dados via `route.params`
	- [ ] `handleUpdate` com PUT `/aulas/:id`
	- [ ] Voltar para “Detalhes” após sucesso

### Fase 5: Finalização e Entrega

- [ ] (Diferencial) Testes com Jest/RTL para componentes/fluxos críticos
- [ ] Revisão de UX: indicadores de loading e mensagens de erro consistentes
- [ ] Gravar vídeo demonstrativo do fluxo completo
- [ ] Publicar com Expo (`npx expo publish`)
- [ ] Atualizar este documento com os links do vídeo e do publish
- [ ] Abrir Pull Request para o repositório original do desafio

Switch Dreams Challenge - Fit Dreams App (React Native)
Este repositório contém a solução para o desafio de frontend da Switch Dreams, focado no desenvolvimento de um aplicativo mobile para a academia Fit Dreams usando React Native e Expo.

O objetivo é consumir uma API RESTful fornecida para criar uma interface de usuário funcional, intuitiva e de qualidade.

Links de Entrega
Link do Expo Publish: [AINDA A SER INSERIDO - LINK DO EXPO AQUI]

Vídeo Demonstrativo: [AINDA A SER INSERIDO - LINK DO VÍDEO AQUI]

📋 Índice






✨ Tecnologias Utilizadas
React Native: Framework principal para o desenvolvimento.

Expo: Ferramenta para build, deploy e gerenciamento do projeto.

JavaScript (ES6+): Linguagem base.

React Navigation: Para gerenciamento de rotas e navegação entre telas.

Axios: (Ou fetch) Para realizar as requisições HTTP à API.

AsyncStorage: Para persistência local do token de autenticação.

(Diferencial) Jest & React Native Testing Library: Para testes unitários e de integração.

(Diferencial) ESLint / Prettier: Para padronização e qualidade de código.

(Diferencial) Figma: Para prototipação (link do protótipo: [SE APLICÁVEL, INSIRA O LINK DO FIGMA]).

🚀 Funcionalidades Implementadas
[ ] Sistema de Autenticação:

Cadastro de novos usuários (consumindo POST /users).

Login de usuários (consumindo POST /login).

Gerenciamento de token JWT (salvando no AsyncStorage e enviando em headers de requisições autenticadas).

[ ] Navegação Protegida:

Separação de rotas públicas (Login, Cadastro) e privadas (App).

Usuário é redirecionado automaticamente para a Home se já possuir um token válido.

[ ] Gerenciamento de Aulas:

Listagem de todas as aulas disponíveis (GET /aulas).

Visualização dos detalhes de uma aula específica (GET /aulas/:id).

Edição dos dados de uma aula (PUT /aulas/:id).

[ ] Feedback ao Usuário:

Indicadores de loading durante chamadas de API.

Tratamento e exibição de mensagens de erro (ex: "Usuário ou senha inválidos").

📱 Telas Desenvolvidas
O fluxo do aplicativo é composto pelas seguintes 5 telas obrigatórias:

[ ] Tela de Cadastro (SignUp)

[ ] Tela de Login (Login)

[ ] Tela de Aulas (Index / Home)

[ ] Tela de Detalhes da Aula (Show)

[ ] Tela de Edição da Aula (Edit)

🔗 Informações da API
Toda a lógica de negócios e dados são fornecidos pela API da Fit Dreams.

URL Base: https://gym.switchdreams.com.br/

Documentação (Postman):

💻 Como Executar o Projeto
Para rodar este projeto localmente, certifique-se de ter o Node.js (LTS) e o Expo Go (no seu dispositivo móvel) instalados.

Clone este repositório (após o fork):

Instale as dependências:

Inicie o servidor de desenvolvimento Expo:

Acesse o aplicativo:

Escaneie o QR Code exibido no terminal com o aplicativo Expo Go (iOS ou Android).

Ou pressione w no terminal para abrir no emulador web.

✅ Plano de Ações e Desenvolvimento
Este é o checklist detalhado que guiará o desenvolvimento do projeto, com o desenvolvimento das telas integrado em cada fase.

Fase 0: Setup e Estrutura do Projeto
[ ] Fazer o fork do repositório oficial.

[ ] Iniciar um novo projeto Expo (npx create-expo-app).

[ ] (Diferencial) Configurar ESLint, Prettier e EditorConfig para padronização de código.

[ ] Criar a estrutura de pastas do projeto (ex: src/screens, src/components, src/services, src/navigation, src/contexts).

Fase 1: Telas de Autenticação (UI e Navegação)
Objetivo: Construir a parte visual e a navegação inicial das telas públicas.

[ ] Instalar e configurar o react-navigation.

[ ] Criar um "Stack Navigator" para o fluxo de autenticação.

[ ] Desenvolver a UI da Tela de Login (LoginScreen.js):

[ ] Criar inputs para email e senha.

[ ] Adicionar um botão "Entrar".

[ ] Adicionar um texto/botão para navegar para a tela de Cadastro.

[ ] Desenvolver a UI da Tela de Cadastro (SignUpScreen.js):

[ ] Criar inputs para os dados do usuário.

[ ] Adicionar um botão "Cadastrar".

[ ] Adicionar um texto/botão para retornar à tela de Login.

[ ] Conectar a navegação entre as telas de Login e Cadastro.

Fase 2: Lógica de Autenticação e Contexto
Objetivo: Tornar as telas de Login e Cadastro funcionais e gerenciar o estado do usuário.

[ ] Criar um serviço de API (src/services/api.js) com Axios, configurando a baseURL.

[ ] Implementar as funções handleLogin e handleSignUp para chamar os endpoints da API (POST /login, POST /users).

[ ] Conectar essas funções aos botões "Entrar" e "Cadastrar".

[ ] Ao receber o token de login, salvá-lo de forma segura usando AsyncStorage.

[ ] Criar um AuthContext para gerenciar o estado global de autenticação (token, dados do usuário, status de loading).

[ ] Implementar a lógica de Navegação Protegida: o app deve verificar a existência de um token no AsyncStorage ao iniciar e direcionar o usuário para a tela principal (se logado) ou para a tela de login (se não logado).

Fase 3: Tela de Listagem de Aulas (Index)
Objetivo: Construir a tela principal que o usuário vê após o login.

[ ] Desenvolver a UI da Tela de Aulas (IndexScreen.js):

[ ] Adicionar um título/header.

[ ] Usar o componente FlatList para a estrutura da lista.

[ ] Criar um componente reutilizável (AulaCard.js ou ListItem.js) para exibir a imagem de capa, nome da aula e nome do professor.

[ ] Implementar a Lógica:

[ ] No useEffect, fazer a chamada à API para buscar as aulas (GET /aulas), enviando o token de autenticação nos headers.

[ ] Exibir um ActivityIndicator (loading) enquanto os dados são carregados.

[ ] Popular a FlatList com os dados recebidos da API.

[ ] Envolver cada item da lista em um TouchableOpacity para que, ao ser pressionado, navegue para a Tela de Detalhes, passando o id da aula como parâmetro.

Fase 4: Telas de Detalhes e Edição da Aula
Objetivo: Permitir que o usuário veja os detalhes completos de uma aula e possa editá-la.

[ ] Desenvolver a UI da Tela de Detalhes da Aula (ShowScreen.js):

[ ] Exibir a imagem de capa em destaque.

[ ] Mostrar todos os campos: nome da aula, professor, horário, dias da semana e descrição.

[ ] Adicionar um botão "Editar Aula".

[ ] Implementar a Lógica da Tela de Detalhes:

[ ] Obter o id da aula dos parâmetros da rota (route.params).

[ ] Fazer uma chamada à API (GET /aulas/:id) para buscar as informações completas.

[ ] Fazer o botão "Editar Aula" navegar para a tela de Edição, passando o objeto completo da aula como parâmetro para pré-preencher o formulário.

[ ] Desenvolver a UI da Tela de Edição da Aula (EditScreen.js):

[ ] Criar um formulário com componentes TextInput para cada campo editável.

[ ] Adicionar um botão "Salvar Alterações".

[ ] Implementar a Lógica da Tela de Edição:

[ ] Receber os dados da aula via route.params e usá-los para preencher os valores iniciais dos inputs.

[ ] Implementar a função handleUpdate que envia os novos dados para a API (PUT /aulas/:id).

[ ] Após a edição ser bem-sucedida, navegar de volta para a Tela de Detalhes.

Fase 5: Finalização e Entrega
Objetivo: Polir o aplicativo e preparar os artefatos para a entrega.

[ ] (Diferencial) Escrever testes com Jest para componentes ou funções críticas.

[ ] Revisar todo o fluxo do aplicativo, garantindo que os indicadores de loading e as mensagens de erro estejam sendo exibidos corretamente.

[ ] Gravar um vídeo demonstrativo claro e conciso de todas as telas e funcionalidades.

[ ] Publicar o aplicativo usando o Expo (npx expo publish).

[ ] Atualizar este README.md com os links do vídeo e do Expo Publish.

[ ] Abrir o Pull Request para o repositório original do desafio.
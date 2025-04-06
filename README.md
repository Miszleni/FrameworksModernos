# CinePrivê 🎬 – Sistema de Reservas de Salas

Este projeto foi desenvolvido como parte da avaliação da disciplina **Frameworks Modernos para Desenvolvimento de Sistemas** (FMDS) – UNEMAT.

## 👨‍💻 Tecnologias utilizadas

- [Vue.js 3](https://vuejs.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Vue Router](https://router.vuejs.org/)
- Componentes reutilizáveis e personalizados
- LocalStorage para simulação de autenticação e persistência de dados

## 📚 Funcionalidades implementadas

✔️ Página inicial com listagem dinâmica de salas disponíveis  
✔️ Página de detalhes de sala com reserva (data e horário com regras de disponibilidade)  
✔️ Tela de login e cadastro (validação e autenticação com `v-if`)  
✔️ Página de Minhas Reservas com recibo e histórico  
✔️ Página de Perfil funcional  
✔️ Reserva com restrições de horário e data (sem passado, sem conflitos)  
✔️ Componente de cabeçalho condicional (exibe apenas se logado)  
✔️ Rotas protegidas com `beforeEach`  
✔️ Notificações visuais com Snackbar  
✔️ Design responsivo com Vuetify (`v-container`, 'v-card, `v-btn`, `v-row`, `v-col`, etc.)


## 🚀 Como executar o projeto

1. Instale as dependências:

bun install
# ou npm install / yarn install

2. Inicie o servidor de desenvolvimento:

bun run dev
# ou npm run dev

3. Acesse no navegador: http://localhost:5173;


## 📌 Aluna
Miszleni Caroline Souza Sudre
Curso: Sistemas de Informação - UNEMAT

## 🧠 Observações
Este sistema simula reservas em salas de cinema e utiliza Vue 3 com foco em boas práticas de componentes, navegação e responsividade com Vuetify.
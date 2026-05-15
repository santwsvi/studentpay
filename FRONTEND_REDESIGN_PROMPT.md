# Redesign Completo do Frontend StudentPay

## Contexto
Projeto em `/Users/victor.gabriel/Documents/Pessoal/studentpay/frontend/`. React 19 + Vite 6 + React Router DOM 7 + Axios. Tudo inline styles atualmente.

Design Guide completo (contrato visual): `/Users/victor.gabriel/Downloads/studentpay-design-guide.html`
**Leia esse arquivo inteiro antes de começar. Ele tem cores, tokens, componentes, wireframes e plano de implementação.**

## Objetivo
Refatorar o frontend inteiro: de MVP com inline styles → produto profissional, acessível e responsivo.

## Stack (adicionar)
- Tailwind CSS v4, @fontsource/inter, Lucide React, Sonner
- Pinar versões exatas (sem ^ nem ~)
- Não adicionar mais nada

## Estrutura alvo
```
src/
├── components/
│   ├── ui/          → Button, Input, Select, DataTable, StatCard, Skeleton, EmptyState, ConfirmDialog
│   ├── layout/      → Navbar, PageHeader, AppLayout
│   └── domain/      → VantagemCard, ExtratoTable, EnviarMoedasForm
├── pages/           → Login, CadastroAluno, CadastroEmpresa, DashboardAluno, DashboardProfessor, DashboardEmpresa
├── context/         → AuthContext
├── services/        → api.js
├── styles/          → globals.css
├── App.jsx
└── main.jsx
```

## Tokens (configurar no tailwind.config.js extend)
- Cores: Primary #E94560, Secondary #6C63FF, Success #21C25E, Warning #F5A623, Error #EF4444, Info #3B82F6
- Neutrals: White #FFFFFF, Gray-50 #F8F9FA, Gray-200 #E9ECEF, Gray-500 #6C757D, Gray-900 #212529
- Font: Inter, sizes: display 32px, heading 24px, subheading 18px, body 16px, small 14px, caption 12px
- Spacing: 4, 8, 12, 16, 24, 32, 48
- Radius: sm 4px, md 8px, lg 12px, xl 16px, full 9999px
- Shadows: sm, md, lg, glow (primary com opacity)

## Execução em 4 Fases

### Fase 1 — Fundação
1. Instalar deps (npm install com versões pinadas)
2. Configurar Tailwind v4 + tailwind.config.js com tokens
3. Criar globals.css (import @fontsource/inter, reset, base styles)
4. Criar componentes ui/: Button, Input, Select
5. Criar layout/: Navbar (dark, hamburger mobile, link ativo), PageHeader, AppLayout
6. Criar ui/EmptyState
7. Remover TODOS os inline styles de TODOS os arquivos

### Fase 2 — Feedback & Polish
1. Integrar Sonner (Toaster no App.jsx)
2. Criar ui/ConfirmDialog (modal, focus trap, Escape, aria-modal)
3. Criar ui/Skeleton (shimmer, variantes: text, card, table, stat)
4. Adicionar loading spinner nos Button durante requests
5. Substituir TODOS os `.catch(() => {})` por tratamento real (toast error)
6. Adicionar interceptor axios para 401 → redirect login
7. Validação client-side básica nos formulários

### Fase 3 — Dashboards
1. Criar ui/StatCard (número animado, label, ícone, badge tendência)
2. Criar ui/DataTable (responsivo stack mobile, hover, empty state)
3. Criar domain/VantagemCard (imagem, título, preço, botão resgatar)
4. Criar domain/ExtratoTable (cores por tipo: verde recebimento, vermelho resgate)
5. Criar domain/EnviarMoedasForm (select com busca, validação)
6. Refatorar Login.jsx — card centralizado, logo, loading button, link cadastro
7. Refatorar CadastroAluno.jsx — seções, novos inputs, validação
8. Refatorar CadastroEmpresa.jsx
9. Refatorar DashboardAluno.jsx — StatCard + VantagemCards grid + ExtratoTable + ConfirmDialog no resgate + toast com cupom
10. Refatorar DashboardProfessor.jsx — 2 StatCards + EnviarMoedasForm + ExtratoTable + toast sucesso
11. Refatorar DashboardEmpresa.jsx — PageHeader + DataTable + form inline + ConfirmDialog inativar

### Fase 4 — Acessibilidade
1. htmlFor em TODO label (id auto-gerado com useId ou counter)
2. aria-label em botões icon-only
3. Focus ring visível (outline, não box-shadow) em todos os interativos
4. Tabelas com caption ou aria-label
5. ConfirmDialog com focus trap real
6. Cores nunca como único indicador (ícone + cor)
7. Verificar contraste AA (4.5:1 mínimo)

## Restrições
- NÃO adicionar TypeScript
- NÃO usar lib de componentes (shadcn, MUI, etc.)
- NÃO mudar rotas ou API
- NÃO adicionar features novas
- NÃO commitar nem push
- NÃO criar testes

## Critério de Aceite Final
- Zero inline styles
- 18 componentes criados e usados nas páginas
- 6 páginas refatoradas conforme wireframes do Design Guide
- Loading em toda chamada API
- Toast em toda ação
- ConfirmDialog em ações destrutivas
- Empty states com copy contextual
- Responsivo 640px-1440px
- Keyboard nav funcional
- htmlFor + aria-label corretos

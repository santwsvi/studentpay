# StudentPay — Sistema de Moeda Estudantil

## Sobre o Projeto

O **StudentPay** é um sistema para estimular o reconhecimento do mérito estudantil através de uma moeda virtual. Professores distribuem moedas aos alunos como forma de reconhecimento, e alunos podem trocá-las por vantagens oferecidas por empresas parceiras.

## Funcionalidades

### Aluno
- Cadastro com dados pessoais, instituição e curso
- Login e autenticação via JWT
- Consulta de saldo e extrato de transações
- Resgate de vantagens com geração de cupom (código enviado por e-mail)

### Professor
- Pré-cadastrado no sistema pela instituição
- Recebimento de 1.000 moedas por semestre (acumuláveis)
- Envio de moedas para alunos com motivo obrigatório
- Consulta de saldo e extrato

### Empresa Parceira
- Cadastro no sistema
- CRUD de vantagens (descrição, foto, custo em moedas)
- Notificação por e-mail ao ter vantagem resgatada

## Tecnologias Utilizadas

| Camada | Tecnologia | Versão |
|---|---|---|
| Backend | Java + Quarkus | 21 / 3.17.8 |
| ORM | Hibernate ORM + Panache | — |
| API | RESTEasy (JAX-RS) + Jackson | — |
| Autenticação | SmallRye JWT | — |
| E-mail | Quarkus Mailer | — |
| Banco de Dados | PostgreSQL | 16+ |
| Frontend | React (Vite) | 19 / 6.x |
| Roteamento | React Router DOM | 7.6.1 |
| HTTP Client | Axios | 1.9.0 |

## Arquitetura

O sistema segue a arquitetura **MVC em camadas**:

```
├── Controller  → Endpoints REST (recebe requisições, valida, delega)
├── Service     → Lógica de negócio e orquestração
├── Model       → Entidades JPA (domínio)
├── Repository  → Acesso a dados (Panache)
├── DTO         → Objetos de transferência (request/response)
└── Config      → Configurações transversais
```

A estratégia de herança JPA é **JOINED** para a hierarquia de usuários (Aluno, Professor, EmpresaParceira) e **SINGLE_TABLE** para transações (EnvioMoedas, CreditoSemestral, ResgateVantagem).

## Como Executar

### Pré-requisitos
- Java 21+
- Maven 3.9+
- PostgreSQL 16+ (ou usar Dev Services do Quarkus com Docker/Podman)
- Node.js 20+

### Backend

```bash
cd backend
./mvnw quarkus:dev
```

O Quarkus Dev Services sobe automaticamente um PostgreSQL em container. A API ficará disponível em `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

### Dados de Teste (Seed)

O sistema já vem com dados pré-cadastrados:

| Tipo | Login | Senha | Detalhes |
|---|---|---|---|
| Professor | joao.aramuni | prof123 | PUC Minas, 1000 moedas |
| Professor | maria.silva | prof123 | UFMG, 1000 moedas |

Instituições: PUC Minas, UFMG, UNA (com cursos vinculados).

## Diagramas

Todos os diagramas estão na pasta `diagrams/`:

- **Diagrama de Casos de Uso** — `use_cases_diagram.png` + `uc_diagram_description.md`
- **Histórias de Usuário** — `user_stories.md`
- **Diagrama de Classes** — `class_diagram.md` + `class_diagram_description.md`
- **Diagrama de Componentes** — `component_diagram.md`
- **Modelo Entidade-Relacionamento** — `er_diagram.md`

## Estrutura do Repositório

```
studentpay/
├── backend/                  # API Quarkus (Java 21)
│   ├── src/main/java/com/studentpay/
│   │   ├── model/            # Entidades JPA
│   │   ├── repository/       # Repositórios Panache
│   │   ├── service/          # Lógica de negócio
│   │   ├── controller/       # REST endpoints
│   │   ├── dto/              # Request/Response DTOs
│   │   └── config/           # Configurações
│   └── src/main/resources/
│       ├── application.properties
│       └── import.sql         # Seed data
├── frontend/                  # SPA React (Vite)
│   └── src/
│       ├── pages/            # Telas (Login, Cadastros, Dashboards)
│       ├── components/       # Componentes reutilizáveis
│       ├── context/          # AuthContext
│       └── services/         # API client (Axios)
├── diagrams/                  # Diagramas UML e ER
└── docs/                      # Documentação do projeto
```

## Equipe

| Nome | GitHub |
|---|---|
| Victor Gabriel Santos Rocha | [@santwsvi](https://github.com/santwsvi) |

## Processo de Desenvolvimento

| Sprint | Entrega |
|---|---|
| Sprint 01 | Modelagem: Diagrama de Casos de Uso, Histórias de Usuário, Diagrama de Classes, Diagrama de Componentes |
| Sprint 02 | Modelo ER, estratégia ORM (Hibernate/Panache), CRUDs iniciais de Aluno e Empresa Parceira (front + back), autenticação JWT |
| Sprint 03 | CRUDs finais, módulo Professor (envio de moedas, extrato), módulo Vantagens (CRUD + resgate), notificação por e-mail, apresentação da arquitetura |

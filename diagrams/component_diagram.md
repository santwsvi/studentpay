## Diagrama de Componentes (UML) — StudentPay

O diagrama abaixo apresenta a **visão de componentes** do sistema (arquitetura em alto nível), alinhada ao padrão **MVC em camadas**:
- **Apresentação (View)**: interface Web/App que consome a API.
- **Controladores (Controller)**: endpoints que recebem requisições, validam entradas e delegam aos serviços.
- **Aplicação (Services / Casos de uso)**: orquestra regras de negócio (autenticação, distribuição, resgate, notificações).
- **Domínio (Model)**: entidades e regras centrais (Aluno, Professor, CarteiraMoedas, TransacaoMoeda, Vantagem etc.).
- **Infraestrutura**: persistência (repositórios + banco) e integrações externas (envio de e-mail).



```mermaid
flowchart TB

%% =========================
%% Atores/Clientes
%% =========================
subgraph Clientes["Clientes"]
  UI["<<view>> Interface Web/App\n(Aluno / Professor / Empresa)"]
end

%% =========================
%% Backend (MVC + Camadas)
%% =========================
subgraph Backend["Sistema de Moeda Estudantil (Backend)"]
  direction TB

  %% --- Apresentação / Controllers ---
  subgraph Controllers["Camada Controller (MVC)"]
    AuthC["<<controller>> AuthController"]
    AlunoC["<<controller>> AlunoController"]
    ProfessorC["<<controller>> ProfessorController"]
    EmpresaC["<<controller>> EmpresaController"]
  end

  %% --- Aplicação / Services ---
  subgraph Services["Camada de Aplicação (Services / Casos de Uso)"]
    AuthS["<<service>> ServicoAutenticacao"]
    DistS["<<service>> ServicoDistribuicaoMoedas"]
    ResgS["<<service>> ServicoResgate"]
    EmailS["<<service>> ServicoNotificacaoEmail"]
  end

  %% --- Domínio / Model ---
  subgraph Dominio["Camada Model (Domínio)"]
    DomModel["<<model>> Entidades e VOs\nUsuario, Aluno, Professor, EmpresaParceira,\nCarteiraMoedas, TransacaoMoeda,\nEnvioMoedas, CreditoSemestral,\nResgateVantagem, Vantagem,\nSemestre, Endereco, CodigoResgate,\nEnums (TipoTransacao, StatusResgate)"]
  end

  %% --- Persistência / Infra ---
  subgraph Persistencia["Infraestrutura de Persistência"]
    Repos["<<component>> Repositórios/DAO\n(Usuarios, Carteiras, Transações,\nInstituições/Cursos, Vantagens, Resgates)"]
    DB["<<database>> Banco de Dados"]
  end
end

%% =========================
%% Integrações externas
%% =========================
subgraph Externos["Serviços Externos"]
  SMTP["<<external>> Provedor de E-mail\n(SMTP / API de E-mail)"]
  Files["<<external>> Armazenamento de Imagens\n(fotoUrl da Vantagem)"]
end

%% =========================
%% Fluxos principais
%% =========================
UI -->|HTTP/HTTPS| AuthC
UI -->|HTTP/HTTPS| AlunoC
UI -->|HTTP/HTTPS| ProfessorC
UI -->|HTTP/HTTPS| EmpresaC

AuthC --> AuthS
AlunoC --> AuthS
ProfessorC --> AuthS
EmpresaC --> AuthS

ProfessorC --> DistS
AlunoC --> ResgS
EmpresaC --> ResgS

DistS --> DomModel
ResgS --> DomModel
AuthS --> DomModel

DistS --> EmailS
ResgS --> EmailS

AuthS --> Repos
DistS --> Repos
ResgS --> Repos
EmailS --> Repos

Repos --> DB

EmailS -->|SMTP/API| SMTP
EmpresaC -.->|upload/URL| Files
AlunoC -.->|consulta| Files

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
%% Interfaces da API (Fornecidas pelo Backend, Requeridas pela UI)
%% =========================
IAuth((IAuthAPI))
IAluno((IAlunoAPI))
IProf((IProfessorAPI))
IEmp((IEmpresaAPI))

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

  %% --- Interfaces de Serviço ---
  IAuthS((IAuthService))
  IDistS((IDistribuicaoService))
  IResgS((IResgateService))
  IEmailS((IEmailService))

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

  %% --- Interfaces de Repositório ---
  IRepo((IRepositories))

  %% --- Persistência / Infra ---
  subgraph Persistencia["Infraestrutura de Persistência"]
    Repos["<<component>> Repositórios/DAO\n(Usuarios, Carteiras, Transações,\nInstituições/Cursos, Vantagens, Resgates)"]
    DB[("\n<<database>>\nBanco de Dados\n")]
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
%% Fluxos principais e Comunicação
%% =========================

%% UI consome API (Requeridas)
UI -->|HTTPS / REST| IAuth
UI -->|HTTPS / REST| IAluno
UI -->|HTTPS / REST| IProf
UI -->|HTTPS / REST| IEmp

%% Front-end também pode buscar imagens diretamente (opcional dependendo da arquitetura)
UI -.->|HTTPS / GET| Files

%% Controllers expõem API (Fornecidas)
IAuth --- AuthC
IAluno --- AlunoC
IProf --- ProfessorC
IEmp --- EmpresaC

%% Controllers consomem Services
AuthC -->|In-Process / DTOs| IAuthS
AlunoC -->|In-Process / DTOs| IAuthS
AlunoC -->|In-Process / DTOs| IResgS
ProfessorC -->|In-Process / DTOs| IAuthS
ProfessorC -->|In-Process / DTOs| IDistS
EmpresaC -->|In-Process / DTOs| IAuthS
EmpresaC -->|In-Process / DTOs| IResgS

%% Services expõem Interfaces
IAuthS --- AuthS
IDistS --- DistS
IResgS --- ResgS
IEmailS --- EmailS

%% Services chamam uns aos outros
DistS -->|In-Process| IEmailS
ResgS -->|In-Process| IEmailS

%% Services consomem Domínio
DistS -->|In-Process / Instanciação| DomModel
ResgS -->|In-Process / Instanciação| DomModel
AuthS -->|In-Process / Instanciação| DomModel

%% Services consomem Repositórios
AuthS -->|In-Process| IRepo
DistS -->|In-Process| IRepo
ResgS -->|In-Process| IRepo
EmailS -->|In-Process| IRepo

%% Repositório expõe Interface
IRepo --- Repos

%% Persistência e Integrações Externas
Repos -->|TCP/IP / SQL| DB
EmailS -->|SMTP / TCP| SMTP
Repos -->|HTTPS / API REST| Files

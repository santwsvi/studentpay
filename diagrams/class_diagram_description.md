
## Descrição — Diagrama de Classes (UML) | StudentPay (Release 1)

Este diagrama de classes descreve o **modelo de domínio** do sistema, que será implementado em arquitetura MVC

### 1. Visão geral do domínio
- **Professores** recebem **cotas semestrais** de moedas e podem transferi-las a alunos (com **motivo obrigatório**).
- **Alunos** acumulam moedas e podem **resgatar vantagens** do catálogo de empresas parceiras.
- O sistema mantém **extrato** (saldo e histórico de transações) para alunos e professores.
- O acesso ao sistema exige **autenticação** (login e senha), com controle de sessão.
- Notificações por **e-mail** são disparadas em eventos relevantes (ganho de moedas e resgate).

---

### 2. Usuários e herança (Generalização)
A classe abstrata **`Usuario`** centraliza atributos e comportamentos comuns a qualquer ator autenticável:
- Dados básicos e credenciais (`nome`, `email`, `login`, `senhaHash`, `ativo`).
- Operações de segurança (`autenticar`, `alterarSenha`, `desativar`).

Especializações:
- **`Aluno`**: dados civis (`cpf`, `rg`, `matricula`) e ações de consulta/resgate.
- **`Professor`**: dados (`cpf`, `departamento`) e ações de crédito semestral/envio de moedas.
- **`EmpresaParceira`**: dados (`cnpj`, `nomeFantasia`, `site`) e gestão de vantagens.

---

### 3. Contexto acadêmico (Instituição e curso)
- **`InstituicaoEnsino`** representa instituições **pré-cadastradas**.
- **`Curso`** representa cursos ofertados por uma instituição.
- Relacionamentos:
  - `InstituicaoEnsino "1" o-- "0..*" Curso` (**agregação**): a instituição oferece vários cursos.
  - `Aluno "1" --> "1" InstituicaoEnsino` e `Aluno "1" --> "1" Curso`: aluno vincula-se a uma instituição e a um curso.
  - `Professor "1" --> "1" InstituicaoEnsino`: professor possui vínculo institucional.

---

### 4. Objetos de valor (Value Objects) e composição
- **`Endereco`** é um `<<valueObject>>` composto por `Aluno`:
  - `Aluno "1" *-- "1" Endereco` (**composição**): o endereço existe como parte do aluno no modelo.
- **`CodigoResgate`** é um `<<valueObject>>` composto por `ResgateVantagem`:
  - `ResgateVantagem "1" *-- "1" CodigoResgate` (**composição**): o código nasce junto do resgate.

---

### 5. Carteira, extrato e histórico
- **`CarteiraMoedas`** representa o “saldo” e operações de movimentação:
  - `creditar`, `debitar`, `obterSaldo`, `obterExtrato`.
- `Aluno` e `Professor` possuem uma carteira (composição):
  - `Aluno "1" *-- "1" CarteiraMoedas`
  - `Professor "1" *-- "1" CarteiraMoedas`
- O extrato é um `<<dto>>`:
  - **`Extrato`** contém `saldoAtual` e lista de `TransacaoMoeda`.
  - `CarteiraMoedas ..> Extrato` (**dependência**): a carteira cria/fornece a visão de extrato para consulta.
- O histórico é composto por transações:
  - `CarteiraMoedas "1" *-- "0..*" TransacaoMoeda` (**composição**): transações fazem parte do histórico da carteira.

---

### 6. Transações de moeda (Abstração e especializações)
A classe abstrata **`TransacaoMoeda`** padroniza qualquer movimentação:
- `dataHora`, `quantidade`, `tipo`, `descricao` e `validar()`.

Especializações:
- **`EnvioMoedas`**: transferência de moedas de professor para aluno.
  - associações: `remetente: Professor (1)` e `destinatario: Aluno (1)`.
  - regra essencial: envio exige **saldo suficiente** do professor e **motivo obrigatório**.
- **`CreditoSemestral`**: crédito de moedas ao professor por semestre.
  - associações: `beneficiario: Professor (1)` e `referenteA: Semestre (1)`.
  - regra essencial: a cada semestre, o professor recebe **1000 moedas** (acumuláveis).
- **`ResgateVantagem`**: débito de moedas do aluno para resgatar uma vantagem.
  - associações: `resgatante: Aluno (1)`, `item: Vantagem (1)` e `fornecedora: EmpresaParceira (1)`.
  - gera `CodigoResgate` e controla `status: StatusResgate`.

Enumerações:
- **`TipoTransacao`**: `CREDITO_SEMESTRAL`, `ENVIO`, `RESGATE`.
- **`StatusResgate`**: `GERADO`, `ENVIADO`, `UTILIZADO`, `EXPIRADO`, `CANCELADO`.

---

### 7. Vantagens e catálogo de empresas
- **`Vantagem`** representa benefícios resgatáveis:
  - `descricao`, `fotoUrl`, `custoMoedas`, `ativa` e métodos `ativar/inativar`.
- A empresa é responsável por seu catálogo:
  - `EmpresaParceira "1" *-- "0..*" Vantagem` (**composição**): vantagens pertencem ao contexto da empresa no sistema.

---

### 8. Autenticação e sessão (Acesso obrigatório)
- **`ServicoAutenticacao`** autentica credenciais e emite sessões:
  - `autenticar(login, senha): Sessao` e `encerrar(sessao): void`.
- **`Sessao`** mantém `token`, `expiraEm` e vínculo com `Usuario`, validando expiração via `estaValida()`.
- Relacionamentos:
  - `ServicoAutenticacao ..> Usuario` (**dependência**): valida credenciais contra usuários.
  - `ServicoAutenticacao "1" --> "0..*" Sessao` (**associação**): emite e mantém múltiplas sessões.

---

### 9. Serviços de aplicação (Orquestração e notificações)
Para concentrar regras de caso de uso e evitar acoplamento com infraestrutura (e-mail), o modelo inclui:
- **`ServicoDistribuicaoMoedas`**:
  - cria `EnvioMoedas`, debita/credita `CarteiraMoedas` e aciona notificação.
- **`ServicoResgate`**:
  - cria `ResgateVantagem`, debita `CarteiraMoedas` e aciona notificação.
- **`ServicoNotificacaoEmail`**:
  - envia e-mail quando aluno ganha moedas e quando ocorre resgate (aluno e empresa).

No diagrama, esses vínculos aparecem como **dependências** (`..>`), indicando uso/orquestração sem relação estrutural forte.

---

### 10. Leituras rápidas de multiplicidade (exemplos)
- `"1" *-- "1"`: composição “parte-todo” (ex.: aluno tem 1 carteira e 1 endereço).
- `"1" o-- "0..*"`: agregação (instituição oferece vários cursos).
- `"1" --> "1"`: associação obrigatória entre duas entidades (ex.: envio tem 1 remetente e 1 destinatário).
- `"1" --> "0..*"`: uma instância se relaciona com várias (ex.: autenticação emite várias sessões).

---

### 11. Escopo do Release 1
Este diagrama cobre as entidades e relações necessárias para:
- cadastro e autenticação de alunos, professores e empresas;
- crédito semestral e distribuição de moedas;
- consulta de extrato (saldo + histórico);
- cadastro de vantagens e resgate com código e notificações por e-mail.

Elementos de infraestrutura (persistência, rotas/controllers e views) não são detalhados aqui, pois o foco é o **modelo de domínio**.

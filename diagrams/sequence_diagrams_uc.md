### UC01 - Cadastrar Aluno



```mermaid
sequenceDiagram
    autonumber
    actor A as Aluno
    participant S as Sistema StudentPay
    
    A->>S: Solicita formulário de cadastro
    S->>S: Carrega Instituições pré-cadastradas
    S-->>A: Retorna formulário
    A->>S: Preenche dados (Nome, Email, CPF, RG, Endereço, Instituição, Curso)
    S->>S: Valida dados e verifica duplicidade
    
    alt Dados válidos
        S->>S: Registra Aluno e cria credenciais
        S-->>A: Mensagem de sucesso
    else Dados inválidos ou Aluno já existe
        S-->>A: Exibe mensagem de erro
    end
```

--------------------------------------------------------------------------------------------------------------
### UC02 - Cadastrar Empresa

```mermaid
sequenceDiagram
    autonumber
    actor E as Empresa Parceira
    participant S as Sistema StudentPay
    
    E->>S: Solicita formulário de cadastro
    S-->>E: Retorna formulário
    E->>S: Preenche dados empresariais e credenciais
    S->>S: Valida dados cadastrais
    
    alt Dados válidos
        S->>S: Registra Empresa Parceira
        S-->>E: Mensagem de sucesso
    else Dados inválidos
        S-->>E: Exibe mensagem de erro
    end

    
```
-----------------------------------------------------------------------------------------------------------------
### UC03 - Efetuar Login


```mermaid
sequenceDiagram
    autonumber
    actor U as Usuário
    participant S as Sistema StudentPay
    
    U->>S: Insere credenciais (Email/CPF e Senha)
    S->>S: Busca usuário no banco de dados
    S->>S: Verifica hash da senha
    
    alt Credenciais corretas
        S->>S: Inicia sessão (Token/Session)
        S-->>U: Redireciona para o painel principal
    else Credenciais incorretas
        S-->>U: Exibe erro de "Usuário ou senha inválidos"
    end

        
```
-----------------------------------------------------------------------------------------------------------------

### UC04 - Consultar Extrato


```mermaid
sequenceDiagram
    autonumber
    actor U as Usuário (Professor/Aluno)
    participant S as Sistema StudentPay
    
    Note over U, S: Pré-condição: <<include>> UC03 - Efetuar Login
    U->>S: Solicita página de extrato
    S->>S: Consulta saldo atual do Usuário
    S->>S: Busca histórico de transações vinculadas
    S-->>U: Exibe saldo e lista de transações detalhada
```
-----------------------------------------------------------------------------------------------------------------
### UC05 - Enviar Moedas


```mermaid
sequenceDiagram
    autonumber
    actor P as Professor
    participant S as Sistema StudentPay
    actor E as Sistema de E-mail
    
    Note over P, S: Pré-condição: <<include>> UC03 - Efetuar Login
    P->>S: Seleciona aluno, informa valor e motivo
    S->>S: Verifica saldo do Professor
    
    alt Saldo Suficiente
        S->>S: Deduz moedas do Professor
        S->>S: Adiciona moedas ao Aluno
        S->>S: Registra transação e motivo
        S-->>P: Confirmação de envio com sucesso
        
        Note over S, E: <<include>> UC08 - Enviar Notificação
        S->>E: Solicita envio de notificação de recebimento para o Aluno
    else Saldo Insuficiente
        S-->>P: Exibe erro de "Saldo insuficiente"
    end
```
-----------------------------------------------------------------------------------------------------------------


### UC06 - Trocar Moedas por Vantagem



```mermaid
sequenceDiagram
    autonumber
    actor A as Aluno
    participant S as Sistema StudentPay
    actor E as Sistema de E-mail
    
    Note over A, S: Pré-condição: <<include>> UC03 - Efetuar Login
    A->>S: Visualiza vantagens e seleciona uma
    S->>S: Verifica saldo atual do Aluno
    
    alt Saldo Suficiente
        S->>S: Deduz valor da vantagem do saldo
        S->>S: Gera código único (cupom)
        S->>S: Registra transação de resgate
        S-->>A: Confirmação de resgate e exibe código
        
        Note over S, E: <<include>> UC08 - Enviar Notificação
        S->>E: Envia e-mail ao Aluno com código do cupom
        S->>E: Envia e-mail à Empresa Parceira com código para conferência
    else Saldo Insuficiente
        S-->>A: Exibe erro de "Saldo insuficiente"
    end
```
-----------------------------------------------------------------------------------------------------------------



### UC07 - Cadastrar Vantagem


```mermaid
sequenceDiagram
    autonumber
    actor E as Empresa Parceira
    participant S as Sistema StudentPay
    
    Note over E, S: Pré-condição: <<include>> UC03 - Efetuar Login
    E->>S: Solicita adição de nova vantagem
    S-->>E: Retorna formulário de vantagem
    E->>S: Envia dados (Descrição, Foto do produto, Custo em moedas)
    S->>S: Valida informações e imagem
    S->>S: Salva vantagem no catálogo
    S-->>E: Confirmação de cadastro da vantagem
```
-----------------------------------------------------------------------------------------------------------------



### UC08 - Enviar Notificação por E-mail


```mermaid
sequenceDiagram
    autonumber
    participant S as Sistema StudentPay
    actor E as Sistema de E-mail
    actor D as Destinatário (Aluno/Parceiro)
    
    Note over S, E: Este caso é invocado internamente por outros UCs
    S->>S: Prepara payload do e-mail (Template, Variáveis, Código/Motivo)
    S->>E: Dispara requisição de envio (API/SMTP)
    E->>D: Entrega e-mail na caixa de entrada
    E-->>S: Retorna status de envio (Sucesso/Falha)
    S->>S: Registra log de notificação
```
-----------------------------------------------------------------------------------------------------------------



### UC09 - Recuperar Senha


```mermaid
sequenceDiagram
    autonumber
    actor U as Usuário
    participant S as Sistema StudentPay
    actor E as Sistema de E-mail
    
    Note over U, S: Ponto de extensão de: UC03 - Efetuar Login
    U->>S: Clica em "Esqueci minha senha" e informa e-mail/CPF
    S->>S: Busca usuário na base de dados
    
    alt Usuário Encontrado
        S->>S: Gera token/link temporário de recuperação
        S->>E: Solicita envio do link de recuperação
        E->>U: Entrega e-mail com instruções
        S-->>U: Exibe aviso: "Se o cadastro existir, um e-mail foi enviado"
    else Usuário Não Encontrado
        S-->>U: Exibe aviso: "Se o cadastro existir, um e-mail foi enviado" 
    end
    
    U->>S: Acessa o link de recuperação
    S-->>U: Exibe formulário de nova senha
    U->>S: Insere e confirma nova senha
    S->>S: Atualiza hash da senha no banco
    S-->>U: Mensagem de "Senha alterada com sucesso"
```
    

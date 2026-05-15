# Modelo Entidade-Relacionamento Conceitual — StudentPay

## Descrição

Este diagrama representa o **modelo conceitual** do sistema StudentPay, focado nas entidades do dominio, seus atributos e relacionamentos, independente de tecnologia ou estrategia de persistencia.

### Entidades principais

- **Usuario**: entidade generalizada com especializacoes Aluno, Professor e EmpresaParceira (hierarquia total e exclusiva)
- **CarteiraMoedas**: cada usuario possui uma carteira que armazena o saldo de moedas
- **TransacaoMoeda**: entidade generalizada para movimentacoes financeiras, com especializacoes EnvioMoedas, CreditoSemestral e ResgateVantagem
- **Vantagem**: beneficio oferecido por uma empresa parceira, resgatavel por alunos
- **InstituicaoEnsino** e **Curso**: entidades de apoio que contextualizam alunos e professores
- **Semestre**: periodo letivo de referencia para creditos semestrais

---

```mermaid
erDiagram

    USUARIO {
        nome
        email
        login
        senha
        ativo
        tipo
    }

    ALUNO {
        cpf
        rg
        matricula
        endereco
    }

    PROFESSOR {
        cpf
        departamento
    }

    EMPRESA_PARCEIRA {
        cnpj
        nomeFantasia
        site
    }

    INSTITUICAO_ENSINO {
        nome
        cnpj
    }

    CURSO {
        nome
    }

    CARTEIRA_MOEDAS {
        saldoAtual
    }

    SEMESTRE {
        ano
        periodo
        inicio
        fim
    }

    TRANSACAO_MOEDA {
        dataHora
        quantidade
        tipo
        descricao
    }

    ENVIO_MOEDAS {
        motivo
    }

    CREDITO_SEMESTRAL {
    }

    RESGATE_VANTAGEM {
        codigoResgate
        geradoEm
        expiraEm
        status
    }

    VANTAGEM {
        descricao
        fotoUrl
        custoMoedas
        ativa
    }

    %% Especializacao de Usuario (total, exclusiva)
    USUARIO ||--o| ALUNO : "e um"
    USUARIO ||--o| PROFESSOR : "e um"
    USUARIO ||--o| EMPRESA_PARCEIRA : "e um"

    %% Vinculo academico
    INSTITUICAO_ENSINO ||--o{ CURSO : "oferece"
    INSTITUICAO_ENSINO ||--o{ ALUNO : "vincula"
    INSTITUICAO_ENSINO ||--o{ PROFESSOR : "vincula"
    CURSO ||--o{ ALUNO : "matricula"

    %% Carteira
    USUARIO ||--|| CARTEIRA_MOEDAS : "possui"
    CARTEIRA_MOEDAS ||--o{ TRANSACAO_MOEDA : "registra"

    %% Especializacao de TransacaoMoeda (total, exclusiva)
    TRANSACAO_MOEDA ||--o| ENVIO_MOEDAS : "e um"
    TRANSACAO_MOEDA ||--o| CREDITO_SEMESTRAL : "e um"
    TRANSACAO_MOEDA ||--o| RESGATE_VANTAGEM : "e um"

    %% Relacionamentos de EnvioMoedas
    PROFESSOR ||--o{ ENVIO_MOEDAS : "envia"
    ALUNO ||--o{ ENVIO_MOEDAS : "recebe"

    %% Relacionamentos de CreditoSemestral
    SEMESTRE ||--o{ CREDITO_SEMESTRAL : "referente a"
    PROFESSOR ||--o{ CREDITO_SEMESTRAL : "beneficiario"

    %% Relacionamentos de ResgateVantagem
    ALUNO ||--o{ RESGATE_VANTAGEM : "resgata"
    VANTAGEM ||--o{ RESGATE_VANTAGEM : "resgatada em"
    EMPRESA_PARCEIRA ||--o{ RESGATE_VANTAGEM : "fornece"

    %% Vantagens
    EMPRESA_PARCEIRA ||--o{ VANTAGEM : "oferece"
```

## Decisoes de modelagem

| Aspecto | Decisao |
|---------|---------|
| Hierarquia de Usuario | Especializacao total e exclusiva: todo usuario e exatamente um entre Aluno, Professor ou EmpresaParceira |
| Endereco do Aluno | Atributo composto dentro de Aluno (valor, nao entidade) |
| Hierarquia de TransacaoMoeda | Especializacao total e exclusiva: toda transacao e exatamente um entre EnvioMoedas, CreditoSemestral ou ResgateVantagem |
| CodigoResgate | Atributos incorporados em ResgateVantagem (valor, nao entidade) |
| CarteiraMoedas | Entidade separada (1:1 com Usuario) para isolar logica financeira |

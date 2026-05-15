# Modelo Entidade-Relacionamento — StudentPay

## Descrição

Este diagrama representa o modelo relacional do sistema StudentPay, mapeado a partir do diagrama de classes (Release 1). A estratégia de herança adotada é **Joined Table** (`JOINED`), onde a tabela `usuarios` contém os atributos comuns e cada subtipo (aluno, professor, empresa_parceira) possui sua própria tabela com chave estrangeira para `usuarios`.

### Decisões de mapeamento

| Decisão | Justificativa |
|---|---|
| Herança JOINED | Evita colunas nulas (vs. SINGLE_TABLE), mantém integridade referencial por subtipo |
| Endereço embutido | Value Object — não tem identidade própria, fica como colunas na tabela `alunos` |
| CarteiraMoedas como tabela separada | Permite consulta independente de saldo sem carregar o usuário inteiro |
| TransacaoMoeda com discriminator | SINGLE_TABLE para transações (EnvioMoedas, CreditoSemestral, ResgateVantagem) — volume alto, queries frequentes no histórico, evita JOINs |
| CodigoResgate embutido | Value Object — colunas na própria tabela de transações (apenas para tipo RESGATE) |

---

```mermaid
erDiagram

    INSTITUICAO_ENSINO {
        uuid id PK
        varchar nome
        varchar cnpj UK
    }

    CURSO {
        uuid id PK
        varchar nome
        uuid instituicao_id FK
    }

    USUARIO {
        uuid id PK
        varchar nome
        varchar email UK
        varchar login UK
        varchar senha_hash
        boolean ativo
        varchar tipo_usuario
    }

    ALUNO {
        uuid id PK, FK
        varchar cpf UK
        varchar rg
        varchar matricula UK
        uuid instituicao_id FK
        uuid curso_id FK
        varchar endereco_logradouro
        varchar endereco_numero
        varchar endereco_complemento
        varchar endereco_bairro
        varchar endereco_cidade
        varchar endereco_estado
        varchar endereco_cep
    }

    PROFESSOR {
        uuid id PK, FK
        varchar cpf UK
        varchar departamento
        uuid instituicao_id FK
    }

    EMPRESA_PARCEIRA {
        uuid id PK, FK
        varchar cnpj UK
        varchar nome_fantasia
        varchar site
    }

    CARTEIRA_MOEDAS {
        uuid id PK
        uuid usuario_id FK, UK
        int saldo_atual
    }

    SEMESTRE {
        uuid id PK
        int ano
        int periodo
        date inicio
        date fim
    }

    TRANSACAO_MOEDA {
        uuid id PK
        uuid carteira_id FK
        varchar tipo
        timestamp data_hora
        int quantidade
        varchar descricao
        uuid professor_remetente_id FK "nullable - apenas ENVIO"
        uuid aluno_destinatario_id FK "nullable - apenas ENVIO"
        varchar motivo "nullable - apenas ENVIO"
        uuid semestre_id FK "nullable - apenas CREDITO_SEMESTRAL"
        uuid professor_beneficiario_id FK "nullable - apenas CREDITO_SEMESTRAL"
        uuid aluno_resgatante_id FK "nullable - apenas RESGATE"
        uuid vantagem_id FK "nullable - apenas RESGATE"
        uuid empresa_id FK "nullable - apenas RESGATE"
        varchar resgate_codigo "nullable - apenas RESGATE"
        timestamp resgate_gerado_em "nullable - apenas RESGATE"
        timestamp resgate_expira_em "nullable - apenas RESGATE"
        varchar resgate_status "nullable - apenas RESGATE"
    }

    VANTAGEM {
        uuid id PK
        varchar descricao
        varchar foto_url
        int custo_moedas
        boolean ativa
        uuid empresa_id FK
    }

    INSTITUICAO_ENSINO ||--o{ CURSO : "oferece"
    INSTITUICAO_ENSINO ||--o{ ALUNO : "vincula"
    INSTITUICAO_ENSINO ||--o{ PROFESSOR : "vincula"
    CURSO ||--o{ ALUNO : "matricula"

    USUARIO ||--o| ALUNO : "subtipo"
    USUARIO ||--o| PROFESSOR : "subtipo"
    USUARIO ||--o| EMPRESA_PARCEIRA : "subtipo"

    USUARIO ||--|| CARTEIRA_MOEDAS : "possui"

    CARTEIRA_MOEDAS ||--o{ TRANSACAO_MOEDA : "historico"

    PROFESSOR ||--o{ TRANSACAO_MOEDA : "remetente (envio)"
    ALUNO ||--o{ TRANSACAO_MOEDA : "destinatario (envio)"
    SEMESTRE ||--o{ TRANSACAO_MOEDA : "referente (credito)"
    ALUNO ||--o{ TRANSACAO_MOEDA : "resgatante (resgate)"
    VANTAGEM ||--o{ TRANSACAO_MOEDA : "item (resgate)"

    EMPRESA_PARCEIRA ||--o{ VANTAGEM : "oferece"
```

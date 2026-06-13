# `diagrams/sequence/` — Fontes PlantUML

Fontes (`.puml`) dos diagramas de sequência do StudentPay (Release 2 · Lab04S02).
As imagens renderizadas ficam em [`out/`](./out/).

| Arquivo | Caso de uso |
|---------|-------------|
| `_style.puml` | Tema visual compartilhado (incluído via `!include`) — **não** é um diagrama |
| `uc01-cadastrar-aluno.puml` | UC01 · Cadastrar Aluno |
| `uc02-cadastrar-empresa.puml` | UC02 · Cadastrar Empresa Parceira |
| `uc03-efetuar-login.puml` | UC03 · Efetuar Login (JWT) |
| `uc04-consultar-extrato.puml` | UC04 · Consultar Extrato |
| `uc05-enviar-moedas.puml` | UC05 · Enviar Moedas |
| `uc06-listar-vantagens.puml` | UC06 · Listar Vantagens |
| `uc07-cadastrar-vantagem.puml` | UC07 · Cadastrar Vantagem |
| `uc08-resgatar-vantagem.puml` | UC08 · Trocar Moedas por Vantagem |
| `uc09-enviar-notificacao.puml` | UC09 · Enviar Notificação por E-mail `«include»` |
| `geral.puml` | Diagrama de Sequência Geral |

## Renderizar

```bash
# requer Java + plantuml.jar  →  https://plantuml.com/download
java -jar plantuml.jar -charset UTF-8 -tpng -o out uc*.puml geral.puml
java -jar plantuml.jar -charset UTF-8 -tsvg -o out uc*.puml geral.puml
```

> O índice navegável com todas as imagens está em
> [`../sequence_diagrams_uc.md`](../sequence_diagrams_uc.md).


# 📘 Relatório de Análise Crítica do Projeto 👨‍💻

## 1. Informações do grupo
- **🎓 Curso:** Engenharia de Software
- **📘 Disciplina:** Laboratório de Desenvolvimento de Software
- **🗓 Período:** 4° Período
- **👨‍🏫 Professor(a):** Prof. Dr. João Paulo Carneiro Aramuni
- **👥 Membros do Grupo:** Gabriel Nogueira e Victor Gabriel Rocha

---

## 📌 2. Identificação do Projeto
- **Nome do projeto:** Sistema de Moeda Estudantil
- **Integrantes do outro grupo:** Igor Lima
- **Link do repositório:** _https://github.com/igorfclima/Sistema-de-Moeda-Estudantil_  
- **Pull requests submetidos pelo seu grupo:** https://github.com/igorfclima/Sistema-de-Moeda-Estudantil/pull/2
  



### 📝 Abrindo o Pull Request: Fluxos de Contribuição via PRs

#### 1. Opção 1 — Usando *Fork* (quando você **não é colaborador**)

1. Crie um **fork** (cópia) do repositório do outro grupo na sua conta.
2. **Clone o seu fork** localmente.
3. Crie um **branch**, faça as refatorações (commits) e envie (**push**) a branch para o seu fork.
4. No GitHub, acesse o **seu fork** e inicie o pull request clicando em **"Compare & pull request"**.
5. O PR deve propor mesclar o **seu branch** para a branch **main** do **repositório original** do outro grupo.
6. Adicione título/descrição e clique em **"Create pull request"**.

#### 2. Opção 2 — Como Membro/Colaborador (quando você **foi incluído** no repositório)

1. Peça para o outro grupo **adicionar seu usuário GitHub como colaborador**.
2. **Clone o repositório original** localmente.
3. Crie um **branch**, faça as refatorações (commits) e envie (**push**) a branch diretamente para o repositório original.
4. No GitHub, no repositório original, inicie o pull request clicando em **"Compare & pull request"**.
5. O PR deve propor mesclar o **seu branch** para a branch **main** do **mesmo repositório**.
6. Adicione título/descrição e clique em **"Create pull request"**.


---

### 🧱 3. Arquitetura e Tecnologias Utilizadas
O projeto utiliza uma arquitetura dividida entre backend e frontend, promovendo modularidade, separação de responsabilidades e facilidade de manutenção.

🏗️ Backend — Spring Boot
O backend foi desenvolvido utilizando Spring Boot, seguindo um padrão próximo ao MVC, com camadas bem definidas:

- Controllers: recebem requisições HTTP e encaminham para a lógica apropriada.

- Services: concentram as regras de negócio e interações entre camadas.  

- Repositories: utilizam Spring Data JPA para acesso aos dados e persistência.  

- Entities/Models/DTOs: representam as estruturas de dados do domínio e transferência.  

Tecnologias empregadas:  

- Spring Boot 3.x  

- Spring Data JPA  

- H2 (Testes/Local) e PostgreSQL (Produção)  

- Spring Web e Spring Security  

### ☁️ Infraestrutura e Deploy em Nuvem
Em vez de renderização server-side monolítica, o projeto focou em uma infraestrutura conteinerizada e distribuída em nuvem:  

- Docker: Utilizado para criar o container do banco de dados localmente.  

- Render: Plataforma escolhida para o deploy contínuo (CI/CD) do backend Spring Boot.

- Flyway: Ferramenta de migração de banco de dados para versionar as tabelas.

### 🌐 Frontend — Next.js
O projeto complementa o backend com um frontend totalmente desacoplado baseado em Next.js, utilizado para criar interfaces reativas e componentes reutilizáveis.

Principais características:

- Renderização híbrida (SSR e SSG) para melhorar SEO e performance.

- Componentização com React.

- Vercel: Plataforma utilizada para o deploy do frontend.

- Comunicação com o backend via APIs REST.

### 🔄 Integração entre Camadas
O backend expõe endpoints REST estritos que são consumidos pelo Next.js.  

Essa arquitetura permite que o backend e o frontend escalem de forma independente.  


### 🗂️ 4. Organização do GitHub e Fluxo de Trabalho Colaborativo
Avaliamos as práticas de Engenharia de Software Colaborativa do projeto, focando na clareza, padronização e rastreabilidade.

4.1. Estrutura do Repositório e Documentação
Estrutura de Pastas: A organização dos diretórios é boa. O backend está isolado de forma lógica, seguindo a hierarquia padrão do Spring.

Documentação Essencial: O arquivo README.md é visualmente muito bom, com diagramas e explicações da regra de negócio, porém apresentou falhas críticas:  

- Inconsistência de Versão: Cita "Spring Boot 4.0.6", versão que sequer existe, enquanto usa a 3.x.  

- Omissão: Falhou ao não documentar as variáveis de ambiente obrigatórias de e-mail (SMTP) necessárias para rodar a aplicação localmente.  

4.2. Gerenciamento de Tarefas (Issues)
- Uso de Issues: O grupo original não utilizou a aba de Issues do GitHub.

- Não há rastreabilidade de como o backlog foi dividido, dificultando saber quem desenvolveu cada funcionalidade.

4.3. Fluxo de Trabalho (Pull Requests e Branches)
- Branches: Foi detectada a ausência de um fluxo de branching seguro.

- Pull Requests (PRs): Não há registros de Pull Requests. A equipe praticou o commit direto (push) na branch main.

- Como resultado, não houve Revisão de Código (Code Review) por pares antes das integrações, o que explica a presença de problemas estruturais que passaram despercebidos.

4.4. Padrões de Commits e Versionamento
- Padrão de Commits: Não existe um padrão claro de mensagens. Commits variam e não especificam escopo.

- Sugestão: A adoção de Conventional Commits (ex: feat:, fix:, refactor:) melhoraria drasticamente a rastreabilidade e a geração automática de changelogs.

- Versionamento (Releases/Tags): O projeto não utiliza Tags ou Releases. Se a versão em produção quebrar, é difícil reverter para um marco estável anterior de forma imediata.

### 🖥️ 5. Dificuldade para Configuração do Ambiente
A experiência de configuração do ambiente local revelou severos gargalos estruturais e de infraestrutura.

5.1. Requisitos de Linguagem e Ferramentas de Build
- Ferramenta de Build: O Maven funcionou adequadamente para baixar as dependências base do Spring Boot.

- Dependências: O projeto possuía conflitos não documentados entre as versões do Flyway e as propriedades de validação do Hibernate.

5.2. Configuração de Persistência e Variáveis de Ambiente
- Conflito de Banco de Dados: O projeto não iniciava de primeira. Havia um travamento de concorrência massivo porque o Flyway (migração) tentava rodar ao mesmo tempo que o Hibernate tentava validar o banco via spring.jpa.hibernate.ddl-auto=validate.

- Variáveis de Ambiente Críticas: O Spring Boot crashava (derrubava a aplicação) logo no startup porque exigia a injeção rigorosa de variáveis de configuração do servidor de e-mail SMTP (EMAIL_HOST, EMAIL_PORT, EMAIL_USER), informações que não estavam documentadas no README.

5.3. Aspectos a Analisar e Soluções Aplicadas
Soluções Aplicadas: 
1. Tivemos que desativar temporariamente o Flyway (spring.flyway.enabled=false) no application.properties ou ajustar o ddl-auto para permitir que o banco subisse.
2. Inserimos variáveis de ambiente "fictícias" nas configurações da IDE para os serviços de SMTP, apenas para satisfazer a injeção de dependência do Spring Mail e impedir o travamento durante o startup.



### 🔎 6. Análise de Qualidade do Código e Testes
6.1. Design e Princípios SOLID
- Coesão e Acoplamento: Os controladores estão sobrecarregados.

- Princípios SOLID Violados: O controlador ProfessorController.java viola o Single Responsibility Principle (SRP). Ele orquestra o HTTP e também faz a construção de mapeamento manual para DTOs, poluindo a classe.

Code Smells:

- Fully Qualified Class Names (FQCN): Pacotes inteiros inseridos no meio das assinaturas de métodos (ex: com.merito.sistema_merito.domain.dto.EnviarMoedasRequest), sujando a leitura.

- Magic Numbers: Valores hardcoded (como 1000 moedas na criação do professor no ServicoProfessor.java) sem serem extraídos para constantes.

6.2. Testabilidade e Cobertura
- Presença de Testes: O projeto carece drasticamente de testes. Há apenas a classe base de carregamento de contexto.

- Cobertura (Estimada): 0% de cobertura para regras de negócio.

- Não há testes validando se um professor pode enviar mais moedas do que tem de saldo, nem o mock do serviço de SMTP.

- Evidência: A pasta src/test/java não possui classes dedicadas para testar a camada Service.

6.3. Segurança e Tratamento de Erros (OWASP Top 10)
- Validação de Entrada (Input Validation): A validação é frágil. Embora utilize @NotBlank, DTOs como EnviarMoedasRequest não possuem limite de caracteres (@Size), abrindo brechas para degradação de banco.

- Tratamento de Exceções: Inexistente de forma global. Sem um @ControllerAdvice, se ocorrer um erro de validação ou de banco, o Spring Boot retorna mensagens genéricas e expõe detalhes técnicos e Stack Traces da arquitetura para o frontend (vazamento de informações).

### 🚀 7. Sugestões de Melhorias
Com base nas análises realizadas, elencamos 7 sugestões prioritárias para a estabilização do projeto:

- Correção da Infraestrutura de Inicialização: Sincronizar o Flyway com o Hibernate para evitar travamentos de concorrência (DDL_AUTO) e tornar o serviço de e-mail (SMTP) opcional ou facilmente mockado em ambiente local.

- Revisão da Documentação: Atualizar o README.md refletindo as versões corretas das tecnologias (Spring Boot 3.x) e documentando todas as variáveis de ambiente obrigatórias.

- Implementação de Suíte de Testes: Implementar testes unitários utilizando JUnit e Mockito para a camada de Service focando no fluxo de moedas, buscando sair de 0% para 70% de cobertura.

- Refatoração para SRP: Desacoplar as regras de validação e mapeamento que "poluem" os controladores (ProfessorController), extraindo essas funções para Mappers ou Serviços.

- Tratamento Global de Erros: Criar um @RestControllerAdvice para capturar exceções globalmente e impedir o vazamento de detalhes internos (Stack Traces) para o frontend.

- Adoção do GitHub Flow: Parar de comitar na main. Adotar criação de branches, Pull Requests para revisão de código e uso de Issues para organizar o backlog.

- Versionamento e Tags: Utilizar Releases e marcações de Tags do Git (ex: v1.0.0) para garantir que versões estáveis possam ser recuperadas em caso de quebra em produção.

### 🔧 8. Refatorações Propostas (3 partes do código)
1️⃣ Refatoração 1 – Tipagem Forte e Remoção de Wildcards
Arquivo: src/main/java/com/merito/sistema_merito/controller/ProfessorController.java

Pull Request: https://github.com/igorfclima/Sistema-de-Moeda-Estudantil/pull/2

🔴 Antes
```java
    @PostMapping("/{id}/enviar-moedas")
    public ResponseEntity<?> enviarMoedas(@PathVariable UUID id, @Valid @RequestBody com.merito.sistema_merito.domain.dto.EnviarMoedasRequest request) {
        var t = servicoProfessor.enviarMoedas(id, request.alunoId(), request.quantidade(), request.motivo());
        return ResponseEntity.ok(t);
    }
```
🟢 Depois
```java
    @PostMapping("/{id}/enviar-moedas")
    public ResponseEntity<TransacaoEnvioDto> enviarMoedas(@PathVariable UUID id, @Valid @RequestBody EnviarMoedasRequest request) {
        TransacaoEnvioDto transacao = servicoProfessor.enviarMoedas(id, request.alunoId(), request.quantidade(), request.motivo());
        return ResponseEntity.ok(transacao);
    }
```
✔ Tipo de refatoração aplicada
Rename Variable / Replace Type / Simplify Imports #### 📝 Justificativa
O uso de curigas (?) ocultava o contrato da API, e os pacotes "inline" (FQCN) poluíam a assinatura do método. A refatoração traz tipagem estrita (TransacaoEnvioDto), remove o nome ruim da variável var t e limpa os imports.

### 2️⃣ Refatoração 2 – Fortalecimento de Validação (Input Validation)
Arquivo: src/main/java/com/merito/sistema_merito/domain/dto/EnviarMoedasRequest.java

Pull Request: [https://github.com/igorfclima/Sistema-de-Moeda-Estudantil/pull/2]

🔴 Antes
```java
public record EnviarMoedasRequest(
        @NotNull UUID alunoId,
        @Min(1) int quantidade,
        @NotBlank String motivo
) {
}
```
🟢 Depois
```java
public record EnviarMoedasRequest(
        @NotNull(message = "O ID do aluno é obrigatório.") 
        UUID alunoId,
        
        @Min(value = 1, message = "A quantidade mínima para envio é de 1 moeda.") 
        int quantidade,
        
        @NotBlank(message = "O motivo do envio não pode ser vazio.") 
        @Size(max = 255, message = "O motivo deve conter no máximo 255 caracteres.") 
        String motivo
) {
}

```
✔ Tipo de refatoração aplicada
Introduce Assertion / Strengthen Validation

📝 Justificativa
O código original carecia de limites no tamanho da String, abrindo brecha para degradação de banco e XSS. Introduzimos @Size e mensagens amigáveis de erro para fortalecer a segurança da entrada de dados (OWASP).

3️⃣ Refatoração 3 – Extração de Constante e Limpeza (Magic Number)
Arquivo: src/main/java/com/merito/sistema_merito/service/ServicoProfessor.java

Pull Request: https://github.com/igorfclima/Sistema-de-Moeda-Estudantil/pull/2

🔴 Antes
```java
    // ... no escopo do método criar() ...
        professor.setDepartamento(request.getDepartamento());
        professor.setSaldoMoedas(1000);
        professor.setInstituicao(instituicao);
        return professorRepository.save(professor);
  ```
🟢 Depois
```java
    // No topo da classe:
    private static final int SALDO_INICIAL_PADRAO = 1000;

    // ... no escopo do método criar() ...
        professor.setDepartamento(request.getDepartamento());
        professor.setSaldoMoedas(SALDO_INICIAL_PADRAO);
        professor.setInstituicao(instituicao);
        return professorRepository.save(professor);
  ```
✔ Tipo de refatoração aplicada
Replace Magic Number with Symbolic Constant

📝 Justificativa
O valor 1000 estava hardcoded direto na lógica ("Número Mágico"). Sua extração para uma constante descritiva torna o código mais coeso, legível e mais fácil de alterar caso a regra de negócio do saldo inicial do sistema mude.

### 9. 📄 Conclusão

A análise crítica do Sistema de Moeda Estudantil permitiu identificar aspectos importantes relacionados à arquitetura, qualidade do código e organização geral do projeto. A investigação detalhada evidenciou pontos positivos, como as excelentes escolhas tecnológicas (desacoplamento via Next.js e Spring Boot, além da conteinerização com Docker), mas também expôs problemas estruturais — como a ausência de cobertura de testes de negócio e o bloqueio de infraestrutura com o Flyway — que comprometem a manutenibilidade, segurança e performance do sistema.

As refatorações propostas (como a limpeza do ProfessorController e a remoção de "números mágicos" com tipagem forte no ServicoProfessor) tiveram impacto direto na melhoria da legibilidade, redução de duplicidade, aumento da coesão e clareza das responsabilidades (SRP). Além disso, práticas recomendadas foram introduzidas nas classes de Request para tornar o código mais robusto, mitigando riscos como:

- validações inconsistentes (corrigidas com mensagens amigáveis);

- trechos suscetíveis a falhas de segurança (mitigados com limites de @Size);

- métodos extensos e difíceis de testar;

- rotinas com potencial para degradação de desempenho devido à falta de organização de pacotes.

A análise também mostrou que melhorias adicionais podem ser adotadas, como:

- padronização da comunicação via Conventional Commits e fluxos baseados em Pull Requests;

- reforço das práticas de segurança (validações mais estruturadas, tratamento de exceções com @ControllerAdvice, prevenção de vulnerabilidades comuns do OWASP);

- otimizações de performance, incluindo redução de operações redundantes e melhor organização das responsabilidades do backend;

- ampliação e atualização da documentação, incluindo requisitos explícitos de variáveis de ambiente para a inicialização;

- tratamento cuidadoso das dependências utilizadas no projeto, sobretudo entre Flyway e Hibernate.


Por fim, o processo reforçou a importância da **refatoração contínua**, **revisão estruturada de código** e **boas práticas de engenharia**, fundamentais para manter um software sustentável, escalável e seguro ao longo de seu ciclo de vida.

10. 📚 Referências
  
Revisando alterações em Pull Requests:

https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/commenting-on-a-pull-request  

Guia oficial de Conventional Commits:  

https://www.conventionalcommits.org/pt-br/v1.0.0/  

Documentação do Spring Boot (boas práticas, segurança e performance):

https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/

OWASP Cheat Sheets (segurança em aplicações web):

https://cheatsheetseries.owasp.org/

# Sistema de Moeda Estudantil - Diagrama de Casos de Uso

Este documento descreve o Diagrama de Casos de Uso para a **Release 1** do Sistema de Moeda Estudantil, uma plataforma voltada para o reconhecimento do mérito estudantil através da distribuição e troca de moedas virtuais.

## 👥 Atores

O sistema interage com os seguintes atores:

### Atores Principais
* **Aluno:** Usuário que recebe moedas por mérito e as troca por vantagens.
* **Professor:** Usuário responsável por distribuir moedas aos alunos como forma de reconhecimento.
* **Empresa Parceira:** Entidade que oferece vantagens (produtos/descontos) em troca das moedas estudantis.

### Atores Secundários (Sistemas Externos)
* **Sistema de E-mail:** Serviço externo acionado pelo sistema principal para enviar notificações, recibos e cupons aos alunos e parceiros.

---

## ⚙️ Casos de Uso Principais

* **Cadastrar Aluno:** Permite que o aluno crie sua conta (informando dados pessoais e instituição).
* **Cadastrar Empresa:** Permite que a empresa parceira crie sua conta no sistema.
* **Cadastrar Vantagem:** Permite que a empresa cadastre os produtos/descontos oferecidos, incluindo valor em moedas, descrição e foto.
* **Efetuar Login:** Autenticação necessária para acessar as funcionalidades restritas do sistema.
* **Consultar Extrato:** Permite que alunos e professores visualizem seu saldo e histórico de transações.
* **Enviar Moedas:** Ação exclusiva do professor para transferir moedas a um aluno, acompanhada de uma mensagem de justificativa.
* **Trocar Moedas por Vantagem:** Ação do aluno para resgatar um benefício oferecido por uma empresa parceira, descontando o valor de seu saldo.
* **Enviar Notificação por E-mail:** Processo automatizado que envia alertas e cupons com códigos gerados pelo sistema.

---

## 🏗️ Decisões de Modelagem e Regras de Negócio

### 1. Tratamento do Evento Temporal (Regra das 1.000 moedas)
A especificação do sistema define a seguinte regra: *"A cada semestre, os professores recebem um total de mil moedas..."*. 

Embora eventos gerados pela passagem do tempo possam ser representados na UML através de um ator **"Tempo"** (ou *Timer*), **optou-se por não incluir este ator e caso de uso no diagrama visual**. 

**Justificativa:** A decisão visa manter o diagrama de casos de uso focado exclusivamente nas interações diretas e ativas entre os usuários humanos (e sistemas externos de notificação) com a plataforma. A rotina de distribuição semestral foi tratada puramente como uma **Regra de Negócio** na documentação textual e na arquitetura interna do sistema, evitando a poluição visual do diagrama.

### 2. Relacionamentos de Inclusão (`<<include>>`)
* **Login Obrigatório:** Como o sistema exige autenticação para a realização dos requisitos, os casos de uso de operação (`Consultar Extrato`, `Enviar Moedas`, `Trocar Moedas` e `Cadastrar Vantagem`) possuem uma dependência de inclusão (`<<include>>`) para o caso de uso `Efetuar Login`.
* **Gatilho de E-mail:** As ações de `Enviar Moedas` e `Trocar Moedas por Vantagem` disparam obrigatoriamente notificações aos envolvidos. Portanto, ambas incluem (`<<include>>`) o caso de uso `Enviar Notificação por E-mail`.

---

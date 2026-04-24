

# StudentPay - Histórias de Usuário

Este documento descreve as Histórias de Usuário para o sistema de moeda estudantil baseada em mérito, seguindo o padrão:
**Como [tipo de usuário], quero [ação] para [benefício].**

Cada história inclui **Critérios de Aceitação** (objetivos e verificáveis).

---

## 1. Módulo do Aluno

### US01 - Cadastro de Aluno
**Como** Aluno,  
**quero** realizar o meu cadastro informando nome, email, CPF, RG, endereço, instituição e curso,  
**para** poder ingressar no sistema e começar a acumular moedas.

* **Critério de Aceitação 1:** O sistema deve permitir apenas a seleção de instituições de ensino que já estejam pré-cadastradas no banco de dados.
* **Critério de Aceitação 2:** O sistema deve validar se todos os campos obrigatórios foram preenchidos antes de finalizar o registro.

### US02 - Consulta de Extrato (Aluno)
**Como** Aluno,  
**quero** visualizar o extrato da minha conta,  
**para** acompanhar o meu saldo atual e o histórico de moedas recebidas ou trocadas.

* **Critério de Aceitação 1:** O extrato deve exibir a origem de cada moeda recebida (nome do professor e motivo).
* **Critério de Aceitação 2:** O extrato deve listar as transações de troca por vantagens, indicando a data e o valor debitado.

### US03 - Troca de Moedas por Vantagens
**Como** Aluno,  
**quero** selecionar uma vantagem cadastrada e resgatá-la,  
**para** usufruir dos benefícios oferecidos pelas empresas parceiras.

* **Critério de Aceitação 1:** O sistema deve impedir a troca caso o aluno não possua saldo de moedas suficiente para a vantagem selecionada.
* **Critério de Aceitação 2:** Após o resgate, o aluno deve receber automaticamente um e-mail com o cupom e um código gerado pelo sistema para a troca presencial.

---

## 2. Módulo do Professor

### US04 - Distribuição de Moedas
**Como** Professor,  
**quero** enviar moedas aos meus alunos com uma mensagem de justificativa,  
**para** reconhecer o seu bom desempenho ou participação em aula.

* **Critério de Aceitação 1:** O sistema deve validar se o professor possui saldo de moedas suficiente no semestre antes de concluir o envio.
* **Critério de Aceitação 2:** O preenchimento da mensagem de motivo deve ser obrigatório e o aluno deve receber uma notificação por e-mail imediatamente após o envio.

### US05 - Gestão de Saldo Semestral
**Como** Professor,  
**quero** receber mil moedas automaticamente a cada novo semestre,  
**para** ter saldo disponível para premiar os alunos.

* **Critério de Aceitação 1:** Ao virar o semestre, o sistema deve adicionar 1.000 moedas ao saldo atual do professor, garantindo que o valor seja acumulativo.
* **Critério de Aceitação 2:** O sistema deve registrar no histórico do professor a entrada das 1.000 moedas de bônus semestral.

---

## 3. Módulo da Empresa Parceira

### US06 - Cadastro de Vantagens
**Como** Empresa Parceira,  
**quero** cadastrar vantagens no sistema incluindo descrição, foto e custo em moedas,  
**para** disponibilizar meus produtos ou serviços para resgate pelos alunos.

* **Critério de Aceitação 1:** O sistema deve exigir obrigatoriamente o upload de uma foto e a inserção do custo em moedas para validar o cadastro da vantagem.
* **Critério de Aceitação 2:** Sempre que um aluno resgatar uma vantagem, a empresa parceira deve receber um e-mail de notificação contendo o código de conferência.

---

## 4. Requisitos Transversais (Segurança)

### US07 - Autenticação de Usuários
**Como** Usuário do Sistema (Aluno, Professor ou Empresa),  
**quero** realizar o login com email e senha,  
**para** acessar as funcionalidades restritas do sistema.

* **Critério de Aceitação 1:** O sistema deve bloquear o acesso e exibir uma mensagem de erro caso as credenciais (login/senha) sejam inválidas.
* **Critério de Aceitação 2:** O sistema deve redirecionar o usuário para o painel correspondente ao seu perfil (Aluno, Professor ou Empresa) após a autenticação bem-sucedida.

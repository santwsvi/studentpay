

# StudentPay - Histórias de Usuário

Este documento descreve as Histórias de Usuário para o sistema de moeda estudantil baseada em mérito, seguindo o padrão:
**Como [tipo de usuário], quero [ação] para [benefício].**

Cada história inclui **Critérios de Aceitação** (objetivos e verificáveis).

---



### US01 - Cadastro de Aluno
**Como** Aluno,  
**quero** realizar o meu cadastro informando nome, email, CPF, RG, endereço, instituição e curso,  
**para** poder ingressar no sistema e começar a acumular moedas.

* **Critério de Aceitação 1:** O sistema deve permitir apenas a seleção de instituições de ensino que já estejam pré-cadastradas no banco de dados.
* **Critério de Aceitação 2:** O sistema deve validar se todos os campos obrigatórios foram preenchidos antes de finalizar o registro.

---

### US02 - Consulta de Extrato (Aluno)
**Como** Aluno,  
**quero** visualizar o extrato da minha conta,  
**para** acompanhar o meu saldo atual e o histórico de moedas recebidas ou trocadas.

* **Critério de Aceitação 1:** O extrato deve exibir a origem de cada moeda recebida (nome do professor e motivo).
* **Critério de Aceitação 2:** O extrato deve listar as transações de troca por vantagens, indicando a data e o valor debitado.

---

### US03 - Troca de Moedas por Vantagens
**Como** Aluno,  
**quero** selecionar uma vantagem cadastrada e resgatá-la,  
**para** usufruir dos benefícios oferecidos pelas empresas parceiras.

* **Critério de Aceitação 1:** O sistema deve impedir a troca caso o aluno não possua saldo de moedas suficiente para a vantagem selecionada.
* **Critério de Aceitação 2:** Após o resgate, o aluno deve receber automaticamente um e-mail com o cupom e um código gerado pelo sistema para a troca presencial.

---



### US04 - Distribuição de Moedas
**Como** Professor,  
**quero** enviar moedas aos meus alunos com uma mensagem de justificativa,  
**para** reconhecer o seu bom desempenho ou participação em aula.

* **Critério de Aceitação 1:** O sistema deve validar se o professor possui saldo de moedas suficiente no semestre antes de concluir o envio.
* **Critério de Aceitação 2:** O preenchimento da mensagem de motivo deve ser obrigatório e o aluno deve receber uma notificação por e-mail imediatamente após o envio.

---

### US05 - Gestão de Saldo Semestral
**Como** Professor,  
**quero** receber mil moedas automaticamente a cada novo semestre,  
**para** ter saldo disponível para premiar os alunos.

* **Critério de Aceitação 1:** Ao virar o semestre, o sistema deve adicionar 1.000 moedas ao saldo atual do professor, garantindo que o valor seja acumulativo.
* **Critério de Aceitação 2:** O sistema deve registrar no histórico do professor a entrada das 1.000 moedas de bônus semestral.

---



### US06 - Cadastro de Vantagens
**Como** Empresa Parceira,  
**quero** cadastrar vantagens no sistema incluindo descrição, foto e custo em moedas,  
**para** disponibilizar meus produtos ou serviços para resgate pelos alunos.

* **Critério de Aceitação 1:** O sistema deve exigir obrigatoriamente o upload de uma foto e a inserção do custo em moedas para validar o cadastro da vantagem.
* **Critério de Aceitação 2:** Sempre que um aluno resgatar uma vantagem, a empresa parceira deve receber um e-mail de notificação contendo o código de conferência.

---



### US07 - Autenticação de Usuários
**Como** Usuário do Sistema (Aluno, Professor ou Empresa),  
**quero** realizar o login com email e senha,  
**para** acessar as funcionalidades restritas do sistema.

* **Critério de Aceitação 1:** O sistema deve bloquear o acesso e exibir uma mensagem de erro caso as credenciais (login/senha) sejam inválidas.
* **Critério de Aceitação 2:** O sistema deve redirecionar o usuário para o painel correspondente ao seu perfil (Aluno, Professor ou Empresa) após a autenticação bem-sucedida.

---



### US08 - Registo de Empresa Parceira
**Como** Empresa Parceira,  
**quero** realizar o meu registo no sistema informando os meus dados corporativos,  
**para** oficializar a parceria e poder oferecer vantagens aos alunos.

* **Critério de Aceitação 1:** O formulário de registo deve solicitar dados de identificação da empresa (como NIPC/CNPJ, Denominação Social, Nome Fantasia e E-mail de contacto corporativo).
* **Critério de Aceitação 2:** O registo da empresa deve criar automaticamente um perfil com credenciais de acesso (login e palavra-passe) para aceder ao painel exclusivo de parceiros.

---

### US09 - Visualização do Catálogo de Vantagens
**Como** Aluno,  
**quero** visualizar um catálogo com todas as vantagens registadas pelas empresas parceiras,  
**para** escolher qual o benefício que desejo resgatar com as minhas moedas.

* **Critério de Aceitação 1:** O catálogo deve exibir a fotografia, a descrição completa, o nome da empresa parceira e o custo em moedas de cada vantagem listada.
* **Critério de Aceitação 2:** O sistema deve destacar ou desativar visualmente as vantagens cujo custo seja superior ao saldo atual de moedas do aluno.

---

### US10 - Pesquisa e Seleção de Alunos
**Como** Professor,  
**quero** pesquisar alunos no sistema pelo nome ou número de identificação civil (ex: Cartão de Cidadão / CPF),  
**para** selecionar corretamente o destinatário antes de realizar o envio de moedas.

* **Critério de Aceitação 1:** A pesquisa do professor deve listar apenas alunos que estejam ativamente matriculados na mesma Instituição de Ensino à qual o professor está vinculado.
* **Critério de Aceitação 2:** A lista de resultados da pesquisa deve exibir o nome completo e o curso do aluno, auxiliando na identificação correta em casos de alunos com nomes semelhantes (homónimos).

---

### US11 - Validação e Baixa de Cupão de Resgate
**Como** Empresa Parceira,  
**quero** inserir no sistema o código do cupão apresentado pelo aluno durante a troca presencial,  
**para** confirmar a validade da troca e impedir que o mesmo código seja reutilizado.

* **Critério de Aceitação 1:** O sistema deve possuir um ecrã onde a empresa parceira possa digitar o código de conferência (recebido por e-mail) e verificar se o mesmo é válido e pertence à sua empresa.
* **Critério de Aceitação 2:** Ao confirmar o código validado, o estado do cupão na base de dados deve mudar para "Utilizado", gerando um erro caso alguém tente validá-lo novamente no futuro.

---

### US12 - Importação de Professores em Lote *(Backoffice/Admin)*
**Como** Instituição de Ensino Parceira,  
**quero** importar uma lista contendo os dados dos meus professores,  
**para** que estes sejam pré-registados no sistema de forma rápida e massiva.

* **Critério de Aceitação 1:** O sistema deve permitir o carregamento (upload) de um ficheiro estruturado (ex: folha de cálculo ou CSV) contendo os campos obrigatórios definidos (nome, documento de identificação e departamento).
* **Critério de Aceitação 2:** Ao processar o ficheiro com sucesso, o sistema deve criar os perfis dos professores, associá-los à instituição responsável pelo upload e deixá-los prontos para o primeiro acesso.

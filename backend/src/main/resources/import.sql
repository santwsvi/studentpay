-- ========================
-- Seed: Instituições de Ensino
-- ========================
INSERT INTO instituicoes_ensino (id, nome, cnpj) VALUES ('a1b2c3d4-0001-0001-0001-000000000001', 'PUC Minas', '17.178.195/0001-67');
INSERT INTO instituicoes_ensino (id, nome, cnpj) VALUES ('a1b2c3d4-0002-0002-0002-000000000002', 'UFMG', '17.217.985/0001-04');
INSERT INTO instituicoes_ensino (id, nome, cnpj) VALUES ('a1b2c3d4-0003-0003-0003-000000000003', 'UNA', '01.911.872/0001-51');

-- ========================
-- Seed: Cursos
-- ========================
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0001-0001-0001-000000000001', 'Engenharia de Software', 'a1b2c3d4-0001-0001-0001-000000000001');
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0002-0002-0002-000000000002', 'Ciência da Computação', 'a1b2c3d4-0001-0001-0001-000000000001');
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0003-0003-0003-000000000003', 'Sistemas de Informação', 'a1b2c3d4-0001-0001-0001-000000000001');
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0004-0004-0004-000000000004', 'Ciência da Computação', 'a1b2c3d4-0002-0002-0002-000000000002');
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0005-0005-0005-000000000005', 'Engenharia de Software', 'a1b2c3d4-0002-0002-0002-000000000002');
INSERT INTO cursos (id, nome, instituicao_id) VALUES ('b1b2c3d4-0006-0006-0006-000000000006', 'Sistemas de Informação', 'a1b2c3d4-0003-0003-0003-000000000003');

-- ========================
-- Seed: Professores (pré-cadastrados)
-- ========================
-- Senha: prof123 (hash bcrypt)
INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0001-0001-0001-000000000001', 'João Paulo Aramuni', 'joao.aramuni@pucminas.br', 'joao.aramuni', '$2a$10$IPdKApJiT5dY5q7lzRPBwe.WmB1nxeupTJf2kufwAY/Khe/zzlwYy', true, 'professor');
INSERT INTO professores (id, cpf, departamento, instituicao_id) VALUES ('c1b2c3d4-0001-0001-0001-000000000001', '111.222.333-44', 'Engenharia de Software', 'a1b2c3d4-0001-0001-0001-000000000001');
INSERT INTO carteiras_moedas (id, usuario_id, saldo_atual) VALUES ('d1b2c3d4-0001-0001-0001-000000000001', 'c1b2c3d4-0001-0001-0001-000000000001', 1000);

INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0002-0002-0002-000000000002', 'Maria Silva', 'maria.silva@ufmg.br', 'maria.silva', '$2a$10$IPdKApJiT5dY5q7lzRPBwe.WmB1nxeupTJf2kufwAY/Khe/zzlwYy', true, 'professor');
INSERT INTO professores (id, cpf, departamento, instituicao_id) VALUES ('c1b2c3d4-0002-0002-0002-000000000002', '555.666.777-88', 'Ciência da Computação', 'a1b2c3d4-0002-0002-0002-000000000002');
INSERT INTO carteiras_moedas (id, usuario_id, saldo_atual) VALUES ('d1b2c3d4-0002-0002-0002-000000000002', 'c1b2c3d4-0002-0002-0002-000000000002', 1000);

-- ========================
-- Seed: Semestre atual
-- ========================
INSERT INTO semestres (id, ano, periodo, inicio, fim) VALUES ('e1b2c3d4-0001-0001-0001-000000000001', 2025, 1, '2025-02-01', '2025-06-30');

-- ========================
-- Seed: Alunos
-- ========================
-- Senha: aluno123
INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0010-0010-0010-000000000010', 'Victor Gabriel', 'victor@pucminas.br', 'victor.gabriel', '$2b$10$U4/LnCLWug8IOLk1vUh8oeu7SlvOmihgWQzHmkLH10T/fU777xGBe', true, 'aluno');
INSERT INTO alunos (id, cpf, rg, matricula, instituicao_id, curso_id) VALUES ('c1b2c3d4-0010-0010-0010-000000000010', '123.456.789-00', 'MG-12.345.678', '2024001', 'a1b2c3d4-0001-0001-0001-000000000001', 'b1b2c3d4-0001-0001-0001-000000000001');
INSERT INTO carteiras_moedas (id, usuario_id, saldo_atual) VALUES ('d1b2c3d4-0010-0010-0010-000000000010', 'c1b2c3d4-0010-0010-0010-000000000010', 0);

INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0011-0011-0011-000000000011', 'Ana Souza', 'ana.souza@pucminas.br', 'ana.souza', '$2b$10$U4/LnCLWug8IOLk1vUh8oeu7SlvOmihgWQzHmkLH10T/fU777xGBe', true, 'aluno');
INSERT INTO alunos (id, cpf, rg, matricula, instituicao_id, curso_id) VALUES ('c1b2c3d4-0011-0011-0011-000000000011', '987.654.321-00', 'MG-87.654.321', '2024002', 'a1b2c3d4-0001-0001-0001-000000000001', 'b1b2c3d4-0002-0002-0002-000000000002');
INSERT INTO carteiras_moedas (id, usuario_id, saldo_atual) VALUES ('d1b2c3d4-0011-0011-0011-000000000011', 'c1b2c3d4-0011-0011-0011-000000000011', 0);

INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0012-0012-0012-000000000012', 'Pedro Lima', 'pedro.lima@ufmg.br', 'pedro.lima', '$2b$10$U4/LnCLWug8IOLk1vUh8oeu7SlvOmihgWQzHmkLH10T/fU777xGBe', true, 'aluno');
INSERT INTO alunos (id, cpf, rg, matricula, instituicao_id, curso_id) VALUES ('c1b2c3d4-0012-0012-0012-000000000012', '456.789.123-00', 'MG-45.678.912', '2024003', 'a1b2c3d4-0002-0002-0002-000000000002', 'b1b2c3d4-0004-0004-0004-000000000004');
INSERT INTO carteiras_moedas (id, usuario_id, saldo_atual) VALUES ('d1b2c3d4-0012-0012-0012-000000000012', 'c1b2c3d4-0012-0012-0012-000000000012', 0);

-- ========================
-- Seed: Empresas Parceiras
-- ========================
-- Senha: empresa123
INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0020-0020-0020-000000000020', 'TechBH', 'contato@techbh.com', 'techbh', '$2b$10$MiLUU8t110SeAyoOnMEhfO9FEARYftujE2R2WWrOahCe2084ljShS', true, 'empresa');
INSERT INTO empresas_parceiras (id, cnpj, nome_fantasia, site) VALUES ('c1b2c3d4-0020-0020-0020-000000000020', '12.345.678/0001-99', 'TechBH', 'https://techbh.com.br');

INSERT INTO usuarios (id, nome, email, login, senha_hash, ativo, tipo_usuario) VALUES ('c1b2c3d4-0021-0021-0021-000000000021', 'Livraria PageOne', 'contato@pageone.com', 'pageone', '$2b$10$MiLUU8t110SeAyoOnMEhfO9FEARYftujE2R2WWrOahCe2084ljShS', true, 'empresa');
INSERT INTO empresas_parceiras (id, cnpj, nome_fantasia, site) VALUES ('c1b2c3d4-0021-0021-0021-000000000021', '98.765.432/0001-11', 'PageOne', 'https://pageone.com.br');

-- ========================
-- Seed: Vantagens
-- ========================
INSERT INTO vantagens (id, descricao, foto_url, custo_moedas, ativa, empresa_id) VALUES ('f1b2c3d4-0001-0001-0001-000000000001', '20% de desconto em perifericos', 'https://picsum.photos/seed/tech/200', 30, true, 'c1b2c3d4-0020-0020-0020-000000000020');
INSERT INTO vantagens (id, descricao, foto_url, custo_moedas, ativa, empresa_id) VALUES ('f1b2c3d4-0002-0002-0002-000000000002', 'Frete gratis em compras acima de R$50', 'https://picsum.photos/seed/frete/200', 15, true, 'c1b2c3d4-0020-0020-0020-000000000020');
INSERT INTO vantagens (id, descricao, foto_url, custo_moedas, ativa, empresa_id) VALUES ('f1b2c3d4-0003-0003-0003-000000000003', '1 livro tecnico gratis (ate R$80)', 'https://picsum.photos/seed/livro/200', 50, true, 'c1b2c3d4-0021-0021-0021-000000000021');
INSERT INTO vantagens (id, descricao, foto_url, custo_moedas, ativa, empresa_id) VALUES ('f1b2c3d4-0004-0004-0004-000000000004', '10% de desconto em qualquer livro', 'https://picsum.photos/seed/desc/200', 20, true, 'c1b2c3d4-0021-0021-0021-000000000021');

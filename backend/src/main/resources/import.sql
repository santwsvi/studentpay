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

# ============================================================================
#  StudentPay — atalhos de orquestração
#  Uso:  make <alvo>      (rode `make help` para ver todos os alvos)
# ============================================================================

COMPOSE     ?= docker compose
PLANTUML_JAR ?= plantuml.jar

.DEFAULT_GOAL := help

.PHONY: help up down build rebuild logs ps restart clean \
        backend-dev frontend-dev diagrams urls db-shell

help: ## Lista os alvos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN{FS=":.*?## "}{printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

up: ## Sobe tudo (db, mailpit, backend, frontend) em background, buildando o que faltar
	$(COMPOSE) up -d --build
	@$(MAKE) --no-print-directory urls

down: ## Derruba os serviços (mantém o volume do banco)
	$(COMPOSE) down

build: ## Builda as imagens sem subir os containers
	$(COMPOSE) build

rebuild: ## Rebuilda as imagens do zero (sem cache)
	$(COMPOSE) build --no-cache

logs: ## Acompanha os logs de todos os serviços (Ctrl-C para sair)
	$(COMPOSE) logs -f

ps: ## Mostra o status dos containers
	$(COMPOSE) ps

restart: ## Reinicia apenas o backend
	$(COMPOSE) restart backend

clean: ## Derruba tudo e REMOVE o volume do banco (apaga os dados)
	$(COMPOSE) down -v

urls: ## Imprime as URLs dos serviços
	@echo ""
	@echo "  Frontend (SPA)     -> http://localhost:5173"
	@echo "  Backend  (API)     -> http://localhost:8080"
	@echo "  Mailpit  (e-mails) -> http://localhost:8025"
	@echo ""

backend-dev: ## Backend em modo dev / live-reload (requer JDK 21 + Postgres)
	cd backend && ./mvnw quarkus:dev

frontend-dev: ## Frontend em modo dev / HMR (requer Node 20)
	cd frontend && npm install && npm run dev

diagrams: ## Renderiza os diagramas de sequência em PNG+SVG (requer Java + $(PLANTUML_JAR))
	cd diagrams/sequence && \
	  java -jar $(PLANTUML_JAR) -charset UTF-8 -tpng -o out uc*.puml geral.puml && \
	  java -jar $(PLANTUML_JAR) -charset UTF-8 -tsvg -o out uc*.puml geral.puml

db-shell: ## Abre um psql no container do banco
	$(COMPOSE) exec db psql -U studentpay -d studentpay

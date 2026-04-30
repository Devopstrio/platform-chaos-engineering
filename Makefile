.PHONY: help build up down test lint migrate simulate-chaos run-validation

help:
	@echo "Platform Chaos Engineering - Management Commands"
	@echo "-----------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Experiment)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "simulate-chaos     : Execute a mock failure injection"
	@echo "run-validation     : Start the steady-state validation engine"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/api tests/experiments
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/chaos-engine
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

simulate-chaos:
	docker-compose exec api python scripts/inject/simulate_failure.py

run-validation:
	docker-compose exec api python apps/validation-engine/main.py

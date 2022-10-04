DC=docker-compose
DC_EXEC=$(DC) exec
FRONTEND=$(DC_EXEC) frontend
NPM=$(FRONTEND) npm run

start:
	$(DC) up -d

stop:
	$(DC) stop

sh:
	$(FRONTEND) sh

dev:
	$(NPM) dev

start-dev:
	$(DC) up -d && $(NPM) dev
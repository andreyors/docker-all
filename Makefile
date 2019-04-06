dc=docker-compose

up:
	${dc} up -d --build

down:
	${dc} down --remove-orphans

ssh:
	${dc} exec app ash

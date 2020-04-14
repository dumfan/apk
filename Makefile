foo:
	echo "OK"

deploy:
	git fetch
	git reset --hard origin/master
	git pull
	docker-compose build
	docker-compose stop
	docker-compose up -d

logs:
	docker-compose logs -f bot

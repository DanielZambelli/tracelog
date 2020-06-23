# Tracelog
Log drain web service for keeping track of system and event logs.
<img src="./app.png" alt="Tracelog" width="100%" border="5" />

## Spin up for local development
* Ensure docker with docker-compose are installed and running
* Open terminal in project root 
* Run `docker-compose -f docker-compose.dev.yml  up`
* Docker will pull, build and start the containers
* On initial startup the database will be migrated and seeded
* Access web client on: http://localhost:3000
* A service instance from the seeds is automatically injected for easy login 
* Server is running on: http://localhost:8080
* REST API Documentation is published at: http://localhost:8080/docs

## Stack
* Node.js, Expressjs, Sequelize/ORM, Postgres, JSDocs, jest, organised into MVC
* React (Create React App), Redux, Reselect
* Docker 

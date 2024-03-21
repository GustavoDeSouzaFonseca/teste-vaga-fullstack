# SERVER BACK-END Node.JS

Develop an API using Node.js for a system for client contract monitoring.

## Table of Contents

- [Installation](#run-locally)
- [Configuration](#config)
- [MVC Structure](#mvc-structure)
- [.ENV](#.env)
- [Endpoints](#endpoints)

## Run locally Backend

To run this project, follow the instructions

1. Clone the repository
```
git clone https://github.com/GustavoDeSouzaFonseca/teste-vaga-fullstack
cd teste-vaga-fullstack/server
```

2. Install all depedencies and start the application
OBS.: note we use Node version > v.20.0.0, to see your node version use the command
```
node -v
```
then
```
npm install
npm start
```

## MVC structure 

The api use mvc structure to organize the folders
MVC | Model View Controller

- Schemas
  - agency.js
- View
  - agencyRoute.js
  - index.js
  - csvRoute.js
- Controllers
  - agencyController.js.js
  - csvController.js.js

## Docker
  Docker compose for up de database neo4j are configurated using 

  - docker-compose.yaml

  use the command `docker-compose up -d` to run docker in detachedment

## Config

Folder to all configuration, the project use mongodb as databaase NoSQL

- config
  - db
    - neo4j.js

    ```
    import Neode from 'neode';

    const neode = new Neode('bolt://localhost:7687', 'neo4j', 'Dbakroo@2024');

    export default neode
    ```
## Endpoints

The API exposes the following *endpoints* from the *BASE_URL*:*PORT* `http://localhost:8080`
BASE_URL and PORT could be used by .env

`/agency`
  * `GET /agency - listAllAgency`
  * `GET /agency/:nrInst - findAgencyByNrInst`
  * `POST /agency - createAgency`
  * `PUT /agency/:nrInst - updateAgencyByNrInst`
  * `DELETE /agency/:nrInst - deleteAgencyByNrInst`
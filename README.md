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
  * `GET /agency - findAgencyByNrInst`
  * `POST /agency - createAgency`
  * `PUT /agency - updateAgencyByNrInst`
  * `DELETE /agency - deleteAgencyByNrInst`

# SERVER FRONT-END Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

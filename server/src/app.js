import express from 'express';
import routes from './routes/index.js';
import errorsManipulator from './middlewares/errorsManipulator.js';
import cors from 'cors'
import neode from './config/db/neo4j.js';

const app = express();

neode.cypher('MATCH (n) RETURN count(n)')
  .then(result => {
    console.log('Success connection at database.');
  })
  .catch(error => {
    console.error('Error to connect at database:', error);
  });

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'POST',
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
routes(app)
app.use(errorsManipulator)



export default app;
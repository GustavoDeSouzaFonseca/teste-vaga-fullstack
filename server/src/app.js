import express from 'express';
import Neode from 'neode';
import routes from './routes/index.js';
import errorsManipulator from './middlewares/errorsManipulator.js';

const app = express();
const instance = new Neode('bolt://localhost:7687', 'neo4j', 'Dbakroo@2024');

instance.cypher('MATCH (n) RETURN count(n)')
  .then(result => {
    console.log('Success connection at database.');
  })
  .catch(error => {
    console.error('Error to connect at database:', error);
  });

routes(app)
app.use(errorsManipulator)



export default app;
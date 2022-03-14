import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import companiesController from './controllers/companies.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/companies', companiesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

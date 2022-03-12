import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import companiesController from './controllers/companies.js';
import cors from 'cors';

const app = express();


// Built in middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// App routes
app.use('/api/v1/companies', companiesController);

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

import { Router } from 'express';
import Companies from '../models/Companies.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const resource = await Companies.insert(req.body);

      res.send(resource);
    } catch (error) {
      next(error);
    }
  });

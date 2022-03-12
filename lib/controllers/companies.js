import { Router } from 'express';
import Companies from '../models/Companies.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const company = await Companies.insert(req.body);

      res.send(company);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const allCompanies = await Companies.getAll();

      res.send(allCompanies);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const company = await Companies.getById(id);
      
      res.send(company);
    } catch (err) {
      next(err);
    }
  });

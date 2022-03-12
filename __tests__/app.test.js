import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Companies from '../lib/models/Companies.js';

describe('pet-insurance-comparison-BE routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new company', async () => {
    const company = {
      title: 'Fetch (formerly Pet Plan)',
      cured_condition_eligible: 'available after 12 months',
      dental: true,
      food: true,
      unique_trait: 'E-vet visits',
      death_coverage: false,
      deductable: '$250',
      cancellation: '30-day money-back guarantee',
      reviews: 'good',
      reimbursement_rate: '90%',
      reimbursement_max: '$5000',
      quote: '$45',
      signup_fee: 'No',
      website: 'https://www.fetchpet.com/',
      logo: 'https://www.petinsurancequotes.com/app/uploads/2022/01/fetch-pet-insurance.png',
    };

    const res = await request(app).post('/api/v1/companies').send(company);

    expect(res.body).toEqual({
      id: '1',
      ...company,
    });
  });
});

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

  it('gets all companies', async () => {
    const company1 = await Companies.insert({
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
    });

    const company2 = await Companies.insert({
      title: '24PetWatch',
      cured_condition_eligible: false,
      dental: false,
      food: true,
      unique_trait:
        'Discount if already a pre-existing customer with their microchip services',
      death_coverage: false,
      deductable: '$100',
      cancellation: '',
      reviews: 'good',
      reimbursement_rate: '80%',
      reimbursement_max: '$5000',
      quote: '$46',
      signup_fee: 'No',
      website: 'https://www.24petwatch.com/pet-insurance',
      logo: 'https://www.petpoint.com/Portals/Petpoint/videos/thumbnails/24PetWatch-USA-Both.jpg',
    });

    const company3 = await Companies.insert({
      title: 'Embrace',
      cured_condition_eligible: 'available after 12 months',
      dental: true,
      food: true,
      unique_trait: 'RX food covered via FSA',
      death_coverage: false,
      deductable: '$200, vanishing',
      cancellation: '30-day money-back guarantee',
      reviews: '',
      reimbursement_rate: '90%',
      reimbursement_max: '$5000',
      quote: '$62',
      signup_fee: '$25',
      website: 'https://www.embracepetinsurance.com/',
      logo: 'https://mma.prnewswire.com/media/1030205/Embrace_Logo.jpg?p=twitter',
    });

    const company4 = await Companies.insert({
      title: 'Spot',
      cured_condition_eligible: 'available after 6 months',
      dental: true,
      food: true,
      unique_trait: '',
      death_coverage: false,
      deductable: '$100',
      cancellation: '30-day money-back guarantee',
      reviews: '',
      reimbursement_rate: '90%',
      reimbursement_max: '$5000',
      quote: '$46',
      signup_fee: 'No',
      website: 'https://spotpetins.com/',
      logo: 'https://www.gatewaygreen.org/wp-content/uploads/2020/03/spot-pet-insurance-re-size1-675x478.png',
    });

    const res = await request(app).get('/api/v1/companies');

    expect(res.body).toEqual([company1, company2, company3, company4]);
  });
});

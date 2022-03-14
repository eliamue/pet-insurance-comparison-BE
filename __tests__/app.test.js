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
      cured: 'available after 12 months',
      dental: true,
      food: true,
      uniquetrait: 'E-vet visits',
      death: false,
      deductable: '$250',
      cancellation: '30-day money-back guarantee',
      reviews: 'good',
      rerate: '90%',
      remax: '$5000',
      quote: '$45',
      fee: 'No',
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
      cured: 'available after 12 months',
      dental: true,
      food: true,
      uniquetrait: 'E-vet visits',
      death: false,
      deductable: '$250',
      cancellation: '30-day money-back guarantee',
      reviews: 'good',
      rerate: '90%',
      remax: '$5000',
      quote: '$45',
      fee: 'No',
      website: 'https://www.fetchpet.com/',
      logo: 'https://www.petinsurancequotes.com/app/uploads/2022/01/fetch-pet-insurance.png',
    });

    const company2 = await Companies.insert({
      title: '24PetWatch',
      cured: 'false',
      dental: false,
      food: true,
      uniquetrait:
        'Discount if already a pre-existing customer with their microchip services',
      death: false,
      deductable: '$100',
      cancellation: 'none',
      reviews: 'good',
      rerate: '80%',
      remax: '$5000',
      quote: '$46',
      fee: 'No',
      website: 'https://www.24petwatch.com/pet-insurance',
      logo: 'https://www.petpoint.com/Portals/Petpoint/videos/thumbnails/24PetWatch-USA-Both.jpg',
    });

    const company3 = await Companies.insert({
      title: 'Embrace',
      cured: 'available after 12 months',
      dental: true,
      food: true,
      uniquetrait: 'RX food covered via FSA',
      death: false,
      deductable: '$200, vanishing',
      cancellation: '30-day money-back guarantee',
      reviews: 'fine',
      rerate: '90%',
      remax: '$5000',
      quote: '$62',
      fee: '$25',
      website: 'https://www.embracepetinsurance.com/',
      logo: 'https://mma.prnewswire.com/media/1030205/Embrace_Logo.jpg?p=twitter',
    });

    const company4 = await Companies.insert({
      title: 'Spot',
      cured: 'available after 6 months',
      dental: true,
      food: true,
      uniquetrait: 'none',
      death: false,
      deductable: '$100',
      cancellation: '30-day money-back guarantee',
      reviews: 'none',
      rerate: '90%',
      remax: '$5000',
      quote: '$46',
      fee: 'No',
      website: 'https://spotpetins.com/',
      logo: 'https://www.gatewaygreen.org/wp-content/uploads/2020/03/spot-pet-insurance-re-size1-675x478.png',
    });

    const res = await request(app).get('/api/v1/companies');

    expect(res.body).toEqual([company1, company2, company3, company4]);
  });

  it('gets one company by id', async () => {
    const company = await Companies.insert({
      title: 'Spot',
      cured: 'available after 6 months',
      dental: true,
      food: true,
      uniquetrait: 'none',
      death: false,
      deductable: '$100',
      cancellation: '30-day money-back guarantee',
      reviews: 'none',
      rerate: '90%',
      remax: '$5000',
      quote: '$46',
      fee: 'No',
      website: 'https://spotpetins.com/',
      logo: 'https://www.gatewaygreen.org/wp-content/uploads/2020/03/spot-pet-insurance-re-size1-675x478.png',
    });

    const res = await request(app).get(`/api/v1/companies/${company.id}`);

    expect(res.body).toEqual(company);
  });

  it('updates a company', async () => {
    const company = await Companies.insert({
      title: 'Embrace',
      cured: 'available after 12 months',
      dental: true,
      food: true,
      uniquetrait: 'RX food covered via FSA',
      death: false,
      deductable: '$200, vanishing',
      cancellation: '30-day money-back guarantee',
      reviews: 'fine',
      rerate: '90%',
      remax: '$5000',
      quote: '$62',
      fee: '$25',
      website: 'https://www.embracepetinsurance.com/',
      logo: 'https://mma.prnewswire.com/media/1030205/Embrace_Logo.jpg?p=twitter',
    });

    const res = await request(app)
      .put(`/api/v1/companies/${company.id}`)
      .send({
        reviews: 'great',
      });
    expect(res.body).toEqual({
      ...company,
      reviews: 'great',
    });
  });

  it('deletes a specific existing company', async () => {
    const company = await Companies.insert({
      title: 'Embrace',
      cured: 'available after 12 months',
      dental: true,
      food: true,
      uniquetrait: 'RX food covered via FSA',
      death: false,
      deductable: '$200, vanishing',
      cancellation: '30-day money-back guarantee',
      reviews: 'fine',
      rerate: '90%',
      remax: '$5000',
      quote: '$62',
      fee: '$25',
      website: 'https://www.embracepetinsurance.com/',
      logo: 'https://mma.prnewswire.com/media/1030205/Embrace_Logo.jpg?p=twitter',
    });

    const res = await request(app).delete(`/api/v1/resources/${company.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${company.title}.`,
    });
  });
});

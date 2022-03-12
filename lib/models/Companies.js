import pool from '../utils/pool.js';

export default class Companies {
  id;
  title;
  website;
  logo;
  quote;
  death_coverage;
  cured_condition_eligible;
  signup_fee;
  deductable;
  unique_trait;
  reviews;
  cancellation;
  reimbursement_max;
  reimbursement_rate;
  dental;
  food;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.quote = row.quote;
    this.death_coverage = row.death_coverage;
    this.website = row.website;
    this.logo = row.logo;
    this.cured_condition_eligible = row.cured_condition_eligible;
    this.signup_fee = row.signup_fee;
    this.deductable = row.deductable;
    this.unique_trait = row.unique_trait;
    this.reviews = row.reviews;
    this.cancellation = row.cancellation;
    this.reimbursement_max = row.reimbursement_max;
    this.reimbursement_rate = row.reimbursement_rate;
    this.dental = row.dental;
    this.food = row.food;
  }

  static async insert({
    title,
    quote,
    death_coverage,
    website,
    logo,
    cured_condition_eligible,
    signup_fee,
    deductable,
    unique_trait,
    reviews,
    cancellation,
    reimbursement_max,
    reimbursement_rate,
    dental,
    food,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO companies (title, quote, death_coverage, website, logo, cured_condition_eligible, signup_fee, deductable, unique_trait, reviews, cancellation, reimbursement_max, reimbursement_rate, dental, food) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
      [
        title,
        quote,
        death_coverage,
        website,
        logo,
        cured_condition_eligible,
        signup_fee,
        deductable,
        unique_trait,
        reviews,
        cancellation,
        reimbursement_max,
        reimbursement_rate,
        dental,
        food,
      ]
    );
    return new Companies(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM companies ORDER BY title');
    return rows.map((row) => new Companies(row));
  }
}

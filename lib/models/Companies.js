import pool from '../utils/pool.js';

export default class Companies {
  id;
  title;
  website;
  logo;
  quote;
  death;
  cured;
  fee;
  deductable;
  uniquetrait;
  reviews;
  cancellation;
  remax;
  rerate;
  dental;
  food;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.quote = row.quote;
    this.death = row.death;
    this.website = row.website;
    this.logo = row.logo;
    this.cured = row.cured;
    this.fee = row.fee;
    this.deductable = row.deductable;
    this.uniquetrait = row.uniquetrait;
    this.reviews = row.reviews;
    this.cancellation = row.cancellation;
    this.remax = row.remax;
    this.rerate = row.rerate;
    this.dental = row.dental;
    this.food = row.food;
  }

  static async insert({
    title,
    quote,
    death,
    website,
    logo,
    cured,
    fee,
    deductable,
    uniquetrait,
    reviews,
    cancellation,
    remax,
    rerate,
    dental,
    food,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO companies (title, quote, death, website, logo, cured, fee, deductable, uniquetrait, reviews, cancellation, remax, rerate, dental, food) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
      [
        title,
        quote,
        death,
        website,
        logo,
        cured,
        fee,
        deductable,
        uniquetrait,
        reviews,
        cancellation,
        remax,
        rerate,
        dental,
        food,
      ]
    );
    return new Companies(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM companies');
    return rows.map((row) => new Companies(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM companies WHERE id=$1', [id]);
    return new Companies(rows[0]);
  }
}

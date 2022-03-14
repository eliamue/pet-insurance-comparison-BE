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
    const { rows } = await pool.query('SELECT * FROM companies WHERE id=$1', [
      id,
    ]);
    return new Companies(rows[0]);
  }

  static async update(
    id,
    {
      title,
      quote,
      uniquetrait,
      website,
      logo,
      death,
      cured,
      fee,
      deductable,
      reviews,
      cancellation,
      remax,
      rerate,
      dental,
      food,
    }
  ) {
    const existingCompany = await Companies.getById(id);
    const new_title = title ?? existingCompany.title;
    const new_quote = quote ?? existingCompany.quote;
    const new_uniquetrait = uniquetrait ?? existingCompany.uniquetrait;
    const new_website = website ?? existingCompany.website;
    const new_logo = logo ?? existingCompany.logo;
    const new_death = death ?? existingCompany.death;
    const new_cured = cured ?? existingCompany.cured;
    const new_fee = fee ?? existingCompany.fee;
    const new_deductable = deductable ?? existingCompany.deductable;
    const new_reviews = reviews ?? existingCompany.reviews;
    const new_cancellation = cancellation ?? existingCompany.cancellation;
    const new_remax = remax ?? existingCompany.remax;
    const new_rerate = rerate ?? existingCompany.rerate;
    const new_dental = dental ?? existingCompany.dental;
    const new_food = food ?? existingCompany.food;

    const { rows } = await pool.query(
      'UPDATE companies SET title=$1, quote=$2, uniquetrait=$3, website=$4, logo=$5, death=$6, cured=$7, fee=$8, deductable=$9, reviews=$10, cancellation=$11, remax=$12, rerate=$13, dental=$14, food=$15 WHERE id=$16 RETURNING *',
      [
        new_title,
        new_quote,
        new_uniquetrait,
        new_website,
        new_logo,
        new_death,
        new_cured,
        new_fee,
        new_deductable,
        new_reviews,
        new_cancellation,
        new_remax,
        new_rerate,
        new_dental,
        new_food,
        id,
      ]
    );
    return new Companies(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM companies WHERE id=$1 RETURNING *',
      [id]
    );
    return new Companies(rows[0]);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      quote: this.quote,
      death: this.death,
      website: this.website,
      logo: this.logo,
      cured: this.cured,
      fee: this.fee,
      deductable: this.deductable,
      uniquetrait: this.uniquetrait,
      reviews: this.reviews,
      cancellation: this.cancellation,
      remax: this.remax,
      rerate: this.rerate,
      dental: this.dental,
      food: this.food,
    };
  }
}

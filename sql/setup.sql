DROP TABLE IF EXISTS companies CASCADE;

CREATE TABLE companies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    quote TEXT,
    death_coverage BOOLEAN,
    cured_condition_eligible TEXT,
    signup_fee TEXT,
    deductable TEXT,
    unique TEXT,
    reviews TEXT,
    cancellation TEXT,
    reimbursement_max TEXT,
    reimbursement_rate TEXT,
    dental BOOLEAN,
    food BOOLEAN
)
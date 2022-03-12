DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    quote TEXT,
    death BOOLEAN,
    cured TEXT,
    fee TEXT,
    deductable TEXT,
    uniquetrait TEXT,
    reviews TEXT,
    cancellation TEXT,
    remax TEXT,
    rerate TEXT,
    dental BOOLEAN,
    food BOOLEAN
);
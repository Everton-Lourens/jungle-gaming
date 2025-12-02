import pg from 'pg';
import { logger } from '../helpers/logger.js';

const URL = process.env.DB_URL || 'postgres://postgres:12345678@localhost:5432/postgres';

export const pool = new pg.Pool({
    connectionString: URL,
    max: (Number(process.env.DB_POOL) || 200),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000
});

pool.on('error', connect);

pool.once('connect', () => {
    logger.info(`database.js: Connected  to db ${URL}`)
    logger.info(`Creating table "pessoas" if not exists`);
    return pool.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_extension WHERE extname = 'pg_trgm'
            ) THEN
                CREATE EXTENSION pg_trgm;
            END IF;
        END $$;

        CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack JSON)
            RETURNS TEXT AS $$
            BEGIN
            RETURN _nome || _apelido || _stack;
            END;
        $$ LANGUAGE plpgsql IMMUTABLE;

        CREATE TABLE IF NOT EXISTS pessoas (
            id uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
            apelido TEXT UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            nascimento DATE NOT NULL,
            stack JSON,
            searchable text GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED
        );

        CREATE INDEX IF NOT EXISTS idx_pessoas_searchable ON public.pessoas USING gist (searchable public.gist_trgm_ops (siglen='64'));

        CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_index ON public.pessoas USING btree (apelido);
        `)
});

async function connect() {
    try {
        logger.info(`Connecting to db ${URL}`);
        await pool.connect();
    } catch (err) {
        setTimeout(() => {
            connect();
            logger.error(`database.js: an error occured when connecting ${err} retrying connection on 3 secs`);
        }, 3000)
    }
}

connect();
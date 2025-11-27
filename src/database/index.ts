import type { UUID } from 'crypto';
import { pool } from './postgres.js';
import { logger } from '../helpers/logger.js';

export async function insertPerson (id: string, { apelido, nome, nascimento, stack }: { apelido: string; nome: string; nascimento: string; stack: string[] }) {
    const query = `
    INSERT INTO
     pessoas(
        id,
        apelido,
        nome,
        nascimento,
        stack
     )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5::json
    )
    `
    return pool.query(query, [id, apelido, nome, nascimento, JSON.stringify(stack)]);
}

export async function findById(id: UUID) {
    const query = `
    SELECT
        id,
        apelido,
        nome,
        to_char(nascimento, 'YYYY-MM-DD') as nascimento,
        stack
    FROM
        pessoas
    WHERE "id" = $1;
    `
    return pool.query(query, [id]);
}

export async function findByTerm(term: string) {
    const query = `
    SELECT
        id,
        apelido,
        nome,
        to_char(nascimento, 'YYYY-MM-DD') as nascimento,
        stack
    FROM
        pessoas
    WHERE
        searchable ILIKE $1
    LIMIT 50;`
    return pool.query(query, [`%${term}%`]);
}

export async function existsByApelido(apelido: string) {
    const querySet = await pool.query(`SELECT COUNT(1) FROM pessoas WHERE "apelido" = $1`, [apelido])
    const [ result ] = querySet.rows;
    return result;
}

export async function count() {
    return pool.query(`SELECT COUNT(1) FROM pessoas`);
}

const LOG_TRESHOLD = Number(process.env.LOG_TRESHOLD) || 3000;

process.env.SLOW_QUERY_ALERT === 'true' ? (() => {
    Object.keys(module.exports).forEach((mK) => {
        const fn = module.exports[mK];

        async function newApi(){
            const timestamp = Date.now();
            const result = await fn(...arguments);
            const final = Date.now();
            const delta = final - timestamp;
            if(delta >= LOG_TRESHOLD){
                logger.warn(`Query took ${delta}ms for fn ${fn.name}`);
            }
            return result;
        }

        module.exports[mK] = newApi.bind(module.exports);
    })
})() : null

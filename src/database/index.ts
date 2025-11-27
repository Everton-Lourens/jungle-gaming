import type { UUID } from 'crypto';
import { pool } from './postgres.js';

module.exports.insertPerson = async function (id: UUID, { apelido, nome, nascimento, stack }: { apelido: string; nome: string; nascimento: string; stack: string[] }) {
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
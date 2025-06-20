import { log } from 'console';
import { Pool } from 'pg';

let pool: Pool;

try {
  pool = new Pool({
    database: 'demo',
    user: 'postgres',
    port: 5432,
    password: '1234',
    host: 'localhost',
  });
  log('Database Connection is Done');
} catch (err: any) {
  log('Database Connection is Failed');
}

export { pool };

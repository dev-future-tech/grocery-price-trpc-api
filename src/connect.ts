import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://product_admin:letmein@localhost:5432/product_db',
    idleTimeoutMillis: 30000
});
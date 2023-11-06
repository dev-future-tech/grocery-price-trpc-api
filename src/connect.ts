import { Client } from 'pg';
import { config } from 'dotenv';
config.apply({path: __dirname+'/.env' });


export const getClient = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'product_admin',
        password: 'letmein',
        database: 'product_db',
        ssl: false
    });
    await client.connect();
    const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
    console.log(res.rows[0].connected);
    return client;
};


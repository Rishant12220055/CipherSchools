const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const connectPG = async () => {
    try {
        const client = await pool.connect();
        console.log(`PostgreSQL Connected: ${client.database}`);
        client.release();
    } catch (error) {
        console.error('PostgreSQL Connection Error:', error);
        // Don't exit process strictly if PG fails, maybe just log? 
        // Usually strict is better for critical dependency.
        // process.exit(1);
    }
};

module.exports = { pool, connectPG };

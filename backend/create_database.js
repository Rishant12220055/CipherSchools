const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
    const dbName = process.env.PG_DATABASE || 'ciphersql_sandbox';

    const client = new Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: 'postgres', // Connect to default 'postgres' db to create new db
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
    });

    try {
        await client.connect();
        console.log('Connected to default postgres database.');

        // Check if database exists
        const checkRes = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);

        if (checkRes.rowCount === 0) {
            console.log(`Database '${dbName}' does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database '${dbName}' created successfully.`);
        } else {
            console.log(`Database '${dbName}' already exists.`);
        }

    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        await client.end();
    }
};

createDatabase();

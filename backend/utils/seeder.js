const { pool } = require('../config/pg');

const seedPostgres = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            role VARCHAR(50),
            salary INTEGER
        );
    `;

    const checkDataQuery = `SELECT COUNT(*) FROM employees;`;

    const insertDataQuery = `
        INSERT INTO employees (name, role, salary) VALUES
        ('Alice', 'Dev', 60000),
        ('Bob', 'Manager', 80000),
        ('Charlie', 'Intern', 30000),
        ('David', 'Dev', 65000),
        ('Eve', 'Designer', 55000);
    `;

    try {
        await pool.query(createTableQuery);
        const res = await pool.query(checkDataQuery);
        const count = parseInt(res.rows[0].count);

        if (count === 0) {
            await pool.query(insertDataQuery);
            console.log('Postgres initialized with sample data (employees table).');
        } else {
            // console.log('Postgres already seeded.');
        }
    } catch (error) {
        console.error('Seeding Postgres failed:', error.message);
    }
};

module.exports = { seedPostgres };

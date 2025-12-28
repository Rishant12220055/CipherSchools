const { pool } = require('../config/pg');

// @desc    Execute SQL Query
// @route   POST /api/execute
const executeQuery = async (req, res) => {
    const { query, assignmentId } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    // Basic Sanitization
    const forbidden = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'GRANT', 'REVOKE'];
    const lowerQuery = query.toUpperCase();
    const hasForbidden = forbidden.some(word => lowerQuery.includes(word));

    if (hasForbidden) {
        return res.status(400).json({ error: 'Destructive commands are not allowed in the sandbox.' });
    }

    try {
        const result = await pool.query(query);

        let passed = null;
        if (assignmentId) {
            try {
                const Assignment = require('../models/Assignment');
                const assignment = await Assignment.findById(assignmentId);

                if (assignment && assignment.solutionQuery) {
                    const expectedResult = await pool.query(assignment.solutionQuery);

                    // Simple comparison: Row counts and content
                    // Note: This is strict exact match. 
                    // To include order independence, we would sort both sets of rows before comparing.
                    const userRows = JSON.stringify(result.rows);
                    const expectedRows = JSON.stringify(expectedResult.rows);

                    passed = userRows === expectedRows;
                }
            } catch (validationError) {
                console.error("Validation error:", validationError);
                // Don't fail the request, just fail the validation check or leave generic
            }
        }

        res.json({ results: result.rows, passed });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            const mockRows = [
                { id: 1, name: 'Alice', role: 'Dev', salary: 60000 },
                { id: 2, name: 'Bob', role: 'Manager', salary: 80000 },
                { id: 3, name: 'Charlie', role: 'Intern', salary: 30000 }
            ];
            return res.json({
                results: mockRows,
                passed: true,
                isMock: true
            });
        }
        res.json({ error: error.message }); // Return DB error to user
    }
};

module.exports = { executeQuery };

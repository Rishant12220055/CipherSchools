const Assignment = require('../models/Assignment');

const assignments = [
    {
        title: 'Basic SELECT',
        difficulty: 'Easy',
        description: 'Learn to retrieve data from a table.',
        question: 'Select all columns from the employees table.',
        solutionQuery: 'SELECT * FROM employees;',
        sampleData: {
            tables: {
                employees: [
                    { id: 1, name: 'Alice', role: 'Dev', salary: 60000 },
                    { id: 2, name: 'Bob', role: 'Manager', salary: 80000 },
                    { id: 3, name: 'Charlie', role: 'Intern', salary: 30000 }
                ]
            }
        }
    },
    {
        title: 'Filtering with WHERE',
        difficulty: 'Medium',
        description: 'Filter data based on specific conditions.',
        question: 'Find all employees with salary > 50000.',
        solutionQuery: 'SELECT * FROM employees WHERE salary > 50000;',
        sampleData: {
            tables: {
                employees: [
                    { id: 1, name: 'Alice', role: 'Dev', salary: 60000 },
                    { id: 2, name: 'Bob', role: 'Manager', salary: 80000 },
                    { id: 3, name: 'Charlie', role: 'Intern', salary: 30000 }
                ]
            }
        }
    },
    {
        title: 'Sorting Results',
        difficulty: 'Easy',
        description: 'Order your results.',
        question: 'Select all employees sorted by salary in descending order.',
        solutionQuery: 'SELECT * FROM employees ORDER BY salary DESC;',
        sampleData: {
            tables: {
                employees: [
                    { id: 1, name: 'Alice', role: 'Dev', salary: 60000 },
                    { id: 2, name: 'Bob', role: 'Manager', salary: 80000 },
                    { id: 3, name: 'Charlie', role: 'Intern', salary: 30000 }
                ]
            }
        }
    }
];

const seedAssignments = async () => {
    try {
        const count = await Assignment.countDocuments();
        if (count === 0) {
            await Assignment.insertMany(assignments);
            console.log('MongoDB initialized with sample assignments.');
        } else {
            // console.log('Assignments already seeded.');
        }
    } catch (error) {
        console.error('Seeding Assignments failed:', error.message);
    }
};

module.exports = { seedAssignments, assignments };

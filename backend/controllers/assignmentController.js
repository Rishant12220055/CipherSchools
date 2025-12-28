const Assignment = require('../models/Assignment');

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Public
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.json(assignments);
    } catch (error) {
        console.error("DB Error, returning mocks:", error.message);
        res.json([
            {
                _id: '1',
                title: 'Basic SELECT',
                difficulty: 'Easy',
                description: 'Learn to retrieve data from a table.',
                question: 'Select all columns from the employees table.',
                sampleData: { table: 'employees' }
            },
            {
                _id: '2',
                title: 'Filtering with WHERE',
                difficulty: 'Medium',
                description: 'Filter data based on specific conditions.',
                question: 'Find all employees with salary > 50000.',
                sampleData: { table: 'employees' }
            }
        ]);
    }
};

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Public
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (error) {
        console.error("DB Error, returning mock for ID:", req.params.id);
        // Mock return
        res.json({
            _id: req.params.id,
            title: 'Basic SELECT (Mock)',
            difficulty: 'Easy',
            description: 'Learn to retrieve data from a table.',
            question: 'Select all columns from the employees table.',
            sampleData: {
                tables: {
                    employees: [
                        { id: 1, name: 'Alice', role: 'Dev', salary: 60000 },
                        { id: 2, name: 'Bob', role: 'Manager', salary: 80000 },
                        { id: 3, name: 'Charlie', role: 'Intern', salary: 30000 }
                    ]
                }
            }
        });
    }
};

module.exports = {
    getAssignments,
    getAssignmentById,
};

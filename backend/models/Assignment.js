const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    sampleData: {
        type: mongoose.Schema.Types.Mixed, // Storing schema/data structure for the UI
        required: false,
    },
    solutionQuery: {
        type: String, // The correct query that yields the expected result
        required: false, // Optional for now
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;

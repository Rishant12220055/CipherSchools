const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectMongoDB = require('./config/db');
const { connectPG } = require('./config/pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const assignmentRoutes = require('./routes/assignmentRoutes');
const { executeQuery } = require('./controllers/queryController');
const { getHint } = require('./controllers/hintController');
const { seedPostgres } = require('./utils/seeder');
const { seedAssignments } = require('./utils/seedAssignments');

// Routes
app.use('/api/assignments', assignmentRoutes);
app.post('/api/execute', executeQuery);
app.post('/api/hint', getHint);

app.get('/', (req, res) => {
    res.send('CipherSQLStudio API is running');
});

// Start Server
const startServer = async () => {
    try {
        await connectMongoDB();
        await connectPG();
        await seedPostgres();
        await seedAssignments();
    } catch (error) {
        console.error("Database connection failed", error);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Server setup completed
startServer();


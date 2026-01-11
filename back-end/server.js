const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/dbConnect');
const corsOptions = require('./config/corsOptions'); // fixed filename
const path = require('path');
require('dotenv').config();

// connect to DB
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

// CORS
app.use(cors(corsOptions));

// Parse JSON and URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (mounted properly)
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/merch'));
app.use('/api', require('./routes/plan'));
app.use('/api', require('./routes/order'));

// Health check
app.get('/health', (req, res) => {
    const healthCheck = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'Service is running successfully',
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    };

    try {
        res.status(200).json(healthCheck);
    } catch (error) {
        healthCheck.status = 'ERROR';
        healthCheck.message = error.message;
        res.status(503).json(healthCheck);
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

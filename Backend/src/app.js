const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://smart-code-ai.vercel.app',
    'http://localhost:5173',  // Local development
    'https://smartcode-ai.vercel.app'  // Deployed frontend
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin); // ✅ Set only the requested origin
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', require('./routes/ai.routes')); // Ensure routes are correctly linked

module.exports = app;

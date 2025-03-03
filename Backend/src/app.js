const express = require('express');
const aiRoutes = require('./routes/ai.routes')

const app = express()

const cors = require("cors");

const allowedOrigins = [
    "https://smart-code-ai.vercel.app", // Frontend URL
    "https://smartcode-ai.vercel.app", // Backend URL
    "http://localhost:5173", // Keep for local testing
  ];
  
  app.use(
    cors({
      origin: "*", // TEMPORARY: Allows all origins (not recommended for production)
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

module.exports = app
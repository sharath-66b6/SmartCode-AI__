const express = require('express');
const cors = require("cors");
const aiRoutes = require('./routes/ai.routes');

const app = express();

const allowedOrigins = [
  "https://smart-code-ai.vercel.app",
  "https://smartcode-ai.vercel.app",
  "https://smartcode-gclpwg0hs-sharath-66b6s-projects.vercel.app", // Backend
  "https://smart-code-ai-git-main-sharath-66b6s-projects.vercel.app", // New Frontend URL
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;


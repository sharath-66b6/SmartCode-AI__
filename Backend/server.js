require('dotenv').config()
const app = require('./src/app')

const cors = require("cors");

const allowedOrigins = [
  "https://smart-code-ai.vercel.app",
  "http://localhost:5173", // Keep this for local testing
];

app.use(
  cors({
    origin: allowedOrigins, // Allow only specific origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If using cookies/auth headers
  })
);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
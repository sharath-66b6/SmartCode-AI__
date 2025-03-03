require('dotenv').config()
const app = require('./src/app') 


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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
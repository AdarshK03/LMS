const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const testRoute = require('./src/routes/Test_Route');
// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api', testRoute);

// Example route
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});





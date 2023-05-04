const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/database');
const cors = require('cors');

// Load env
dotenv.config();

// Connect to MongoDB
connectDB();

// Route files
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const staff = require('./routes/staff');
const agent = require('./routes/agent');

const app = express();

// Enable CORS
app.use(cors());
// Body parser middleware
app.use(express.json());
// Access files as req.files
app.use(fileUpload());

// Mount routers
app.use('/api/v1/admin', admin);
app.use('/api/v1/staff', staff);
app.use('/api/v1/auth', auth);
app.use('/api/v1/agent', agent);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running at port ${8080}`);
});
const express = require('express');
const errorHandler = require('./middleware/error');

// Route files
const admin = require('./routes/admin');

const app = express();

// Body parser middleware
app.use(express.json());

// Mount routers
app.use('/api/v1/admin', admin);

// Error handling middleware
app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running at port ${8080}`);
});
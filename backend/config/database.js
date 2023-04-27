const mongoose = require('mongoose');

const connectDB = async () => {
  const con = await mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${con.connection.host}`);
};

module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  const con = await mongoose.connect(
    'mongodb+srv://sahanwalpita:fi1aMtZ9tMHuTbyN@cluster0.hvbmbdn.mongodb.net/HolidayCentral?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`MongoDB connected: ${con.connection.host}`);
};

module.exports = connectDB;
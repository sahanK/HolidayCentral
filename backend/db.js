const mongoose = require("mongoose");

var mongUrl = 'mongodb+srv://sahanwalpita:fi1aMtZ9tMHuTbyN@cluster0.hvbmbdn.mongodb.net/HolidayCentral?retryWrites=true&w=majority';

mongoose.connect(mongUrl , {useUnifiedTopology:true , useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error' , ()=> {
    console.log('Mongodb connection faild')
})

connection.on('connected' , ()=> {
    console.log('Mongodb alredy connected')
})

module.exports = mongoose
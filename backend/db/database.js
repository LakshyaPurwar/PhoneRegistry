exports.connectDatabase = ()=>{
    const mongoose = require('mongoose');

    mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.wxfzjsm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('database connected successfully');
    })
}
const mongoose = require("mongoose");

const databaseConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB is connected")
    }).catch(()=>{
        console.log("failed to connect to db")
    })
}
module.exports = databaseConnection
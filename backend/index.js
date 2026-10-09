
const express = require("express");
require("dotenv").config()
const cors = require("cors")
const databaseConnection = require('./models/db')
const AuthRoutes = require("./routes/AuthRoutes")
const ProductRouter = require("./routes/ProductRouter")
const ExpenseRouter = require("./routes/ExpenseRouter");
const ensureAuthentication = require("./middlewares/Auth");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/auth', AuthRoutes)
app.use('/products', ProductRouter)
app.use('/expenses' , ensureAuthentication ,  ExpenseRouter)

databaseConnection()

PORT = process.env.PORT || 500

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
})


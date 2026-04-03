import express, { application } from 'express'
import mongoose from 'mongoose'
import { productRoute } from './routes/product.route.js'
import { cartRoute } from './routes/cart.route.js'
import { userRoute } from './routes/user.route.js'
import cors from "cors"

const app=new express()
const port=3000

app.use(cors()) 
app.use(express.json())   //body parsing middleware

//cloud DB
mongoose.connect("mongodb+srv://narendrav11102_db_user:TOiCOqQ43e5rDAnH@cluster0.axigyjt.mongodb.net/")
.then(()=>{
    console.log("DB connected cloud");
})
.catch(err=>{
    console.log("DB not connected");
})


productRoute(app)
cartRoute(app)
userRoute(app)

//creating server
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})


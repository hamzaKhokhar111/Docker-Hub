const mongoose=require('mongoose');
const express=require('express');
const connectDB = require('./Database/db');
const cors=require('cors');
const dotenv=require("dotenv");
const router = require('./routes/user.route');
dotenv.config();

const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"

}))

connectDB();

app.use('/api/user',router)

app.listen(3000,()=>{
   console.log("Server is running at Port 3000")
})



app.use((err,req,resp,next)=>{
    const statuscode=err.statuscode || 500;
    const message =err.message || 'Internal Server error';
    return resp.status(statuscode).json({
        success:false,
        statuscode,
        message,
    });
});
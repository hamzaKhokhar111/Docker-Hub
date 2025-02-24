const mongoose=require('mongoose');
const express=require('express');
const User = require('../models/user.model');
const router=express.Router();
const bcryptjs=require('bcryptjs');


router.post('/signup',async(req,resp)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        resp.status(201).json("USer created successufully");
    } catch(error) {
        console.log(error)
        
    }
})

router.get('/test',(req,resp)=>{
    resp.send("This is over first Api")
})



module.exports=router;
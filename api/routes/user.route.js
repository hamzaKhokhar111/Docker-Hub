const mongoose=require('mongoose');
const express=require('express');
const User = require('../models/user.model');
const router=express.Router();
const bcryptjs=require('bcryptjs');


router.post('/signup',async(req,resp,next)=>{
    const {username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try {
        await newUser.save();
        resp.status(201).json("USer created successufully");
    } catch(error) {
        next(error)
        
    }
});

router.post('/signin',async(req,resp)=>{
    const {username,password}=req.body;
    try {
        const existinguser=await User.findOne({username});
        if(!existinguser){
            return resp.status(404).json({message:'User not find'})
        }

        const isPasswordCorrect=bcryptjs.compareSync(password,existinguser.password);
        if(!isPasswordCorrect){
            return resp .status(401).json({message:"Invalid Credentials"});
        }
        resp.status(201).json("USer successufully login");

    } catch(error) {
        next(error)
        
    }
})

router.get('/test',(req,resp)=>{
    resp.send("This is over first Api")
})



module.exports=router;
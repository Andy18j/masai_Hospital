const express = require("express")

const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { doctorRouter } = require("./doctor.route")
const { doctorModel } = require("../model/doctor.model")
require("dotenv").config()

const userRouter = express.Router()


userRouter.post("/signup",async(req,res)=>{
    try{
        const {Email,Password,Confirm_Password} = req.body
        const hashed = await bcrypt.hash(Password,8)
        const newUser = userModel({
            Email,Password:hashed,Confirm_Password:hashed
        })
        await newUser.save()
        res.status(200).json({msg:"user are ragisterd sucessfullyy..",newUser})

    }
    catch(err){
        res.status(402).json({msg:"Something went wrong for ragistaring the user data"})
        console.log(err)
    }
})



userRouter.post("/login",async(req,res)=>{
    try{
        const {Email,Password}=req.body
        const newuser = await userModel.findOne({Email})
        if (!newuser){
            return res.status(501).json({msg:"The user are not found in database"})
        }
        const pass = await bcrypt.compare(Password,newuser.Password)
        if (!pass){
            return res.status(501).json({msg:"Incorrect password..Try again"})
        }
        const token = jwt.sign({userId:newuser._id},process.env.key)
        res.status(201).json({msg:"Login Sucessfully..",newuser,token:token})

    }
    catch(err){
        res.status(402).json({msg:"Invalid Credentials"})
    }
})



module.exports = {
    userRouter
}
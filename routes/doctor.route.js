const express = require("express")
const {doctorModel} = require("../model/doctor.model")


const doctorRouter = express.Router()


doctorRouter.post("/appointments",async(req,res)=>{
    try{
        const {name,image,specialization,experience,location,date,slots,fee}= req.body
        const user = await doctorModel({name,image,specialization,experience,location,date,slots,fee})
        await user.save()
        res.status(201).json({msg:"appointment Has been Fixed..",user})

    }
    catch(err){
        res.status(402).json({msg:"Something went wrong with booking appointments"})
    }
})

//for getting doctor appointments
doctorRouter.get("/",async(req,res)=>{
    try{
        const doctor = await doctorModel.find()
        res.status(200).json({msg:"All Specialist Doctors are Here..",doctor})

    }
    catch(err){
        res.status(402).json({msg:"Something went wrong"})
    }
 })

//delete the specific doctor

doctorRouter.delete("/delete/:id",async(req,res)=>{
    try{
      const deletedoctor = await doctorModel.findByIdAndDelete(req.params._id)
      res.status(201).json({msg:"Delete The Specific Doctor"})
    }
    catch(err){
        res.status(402).json({msg:"Something went wrong"})
    }
})


// filter by specialization / 
doctorRouter.get("/filter/:specialization",async(req,res)=>{
    const {specialization} = req.params
    try{
        const filter = await doctorModel.find({specialization:specialization})
        if (filter.length===0){
            return res.status(404).json({msg:"Doctor Not Avalable Now!! Please Try Again.."})
        }else{
            res.status(200).json({msg:"filter the data by specialization...",filter})
        }
    }
    catch(err){
        res.status(402).json({msg:"Something went wrong for filtering"})
    }
})

doctorRouter.get("/sort/:date",async(req,res)=>{
  try{
    const sort = await doctorModel.find().sort({date:"desc"})
    res.status(200).json({msg:"here are sorting the doctors data by date",sort})

  }
  catch(err){
    res.status(402).json({msg:"something went wrong with the sorting"})
  }
})


// /for searchbydoctorname ?  

doctorRouter.get("/search/:name",async(req,res)=>{
  const {name} = req.params
  try{
    const search = await doctorModel.find({name :{$regex : new RegExp(name,"i")}
})
   res.status(201).json({msg:"The doctor are here",search})
  }
  catch(err){
    res.status(501).json({msg:"Something went wrong for searching"})
  }
})




module.exports = {
    doctorRouter
}
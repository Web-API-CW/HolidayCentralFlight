import express from "express";
import BookingModel from "../models/BookingModel.js";

const router = express.Router();

//create
router.post("/", async (req,res)=>{

    const newFlightBooking = new BookingModel(req.body);
    try{
        const saveFlightBooking = await newFlightBooking.save();
        res.status(200).json(saveFlightBooking);
    }catch(err){
        res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req,res)=>{

    try{
        const updateFlightBooking = await BookingModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updateFlightBooking);
    }catch(err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", async (req,res)=>{

    try{
        await BookingModel.findByIdAndDelete(req.params.id);
        res.status(200).json("FlightBooking has been canceled !");
    }catch(err){
        res.status(500).json(err);
    }
});

//get
router.get("/:id", async (req,res)=>{

    try{
        const FlightBooking = await BookingModel.findById(req.params.id);
        res.status(200).json(FlightBooking);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all 
router.get("/", async (req,res)=>{

    try{
        const FlightBookings = await BookingModel.find();
        res.status(200).json(FlightBookings);
    }catch(err){
        res.status(500).json(err);
    }
});

export default router;
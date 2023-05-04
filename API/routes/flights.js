import express from "express";
import FlightModel from "../models/FlightModel.js";

const router = express.Router();

//create
router.post("/", async (req,res)=>{

    const newFlight = new FlightModel(req.body);
    try{
        const saveFlight = await newFlight.save();
        res.status(200).json(saveFlight);
    }catch(err){
        res.status(500).json(err);
    }
});

//update
router.put("/:id", async (req,res)=>{

    try{
        const updateFlight = await FlightModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updateFlight);
    }catch(err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", async (req,res)=>{

    try{
        await FlightModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Flight has been deleted !");
    }catch(err){
        res.status(500).json(err);
    }
});

//get
router.get("/:id", async (req,res)=>{

    try{
        const Flight = await FlightModel.findById(req.params.id);
        res.status(200).json(Flight);
    }catch(err){
        res.status(500).json(err);
    }
});

//get all 
router.get("/", async (req,res)=>{

    try{
        const Flights = await FlightModel.find();
        res.status(200).json(Flights);
    }catch(err){
        res.status(500).json(err);
    }
});

export default router;
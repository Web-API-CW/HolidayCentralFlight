import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import flightRoute from "./routes/flights.js";
import flightBookingRoute from "./routes/bookings.js";

import cors from 'cors';

const app = express();
dotenv.config();

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }    
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected");    
});

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/flights", flightRoute);
app.use("/api/flightBookings", flightBookingRoute);

app.listen(8080, ()=>{
    connect();    
})
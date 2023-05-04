import mongoose from 'mongoose';

const FlightSchema = new mongoose.Schema({
    FlightNumber: {        type: String, required:true    },
    Departure: {        type: String, required:true    },
    Arrival: {        type: String, required:true    },
    DepartureDateTime: {        type: String, required:true    },
    ArrivalDateTime: {        type: String, required:true    },
    Duration: {        type: String   },
    Airline: {        type: String   },
    CabinClass: {        type: String   },
    Price: {        type: Number, required:true    },
    SeatAvailability: {        type: String   },
    MealOptions: {        type: String   }
},
{collection :'FlightData'});



export default mongoose.model("Flight", FlightSchema);
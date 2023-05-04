import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    FlightNumber: {        type: String, required:true    },
    ClientName: {        type: String, required:true    },
    ClientNIC: {        type: String, required:true    },
    ClientContactNum: {        type: String, required:true    },
    CabinClass: {        type: String   },
    Seat: {        type: String   },
    Meal: {        type: String   }
},
{collection :'FlightBookingData'});



export default mongoose.model("FlightBooking", BookingSchema);
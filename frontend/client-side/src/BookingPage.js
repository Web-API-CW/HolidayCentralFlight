import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './booking-form.css'; // Import the CSS file

function BookingPage(props) {
    // State variables to hold the flight data and the user's booking details
    const [flight, setFlight] = useState({});
    const [bookingDetails, setBookingDetails] = useState({
      name: '',
      email: '',
      ClientNIC: '',
      ClientContactNum: '',
      CabinClass: '',
      Seat: '',
      Meal: '',
      flightId: props.flightId,
    });
    
    // Fetch flight data from the API when the component mounts
    useEffect(() => {
      fetch(`http://localhost:8080/api/flights/${props.flightId}`)
        .then((res) => res.json())
        .then((data) => setFlight(data))
        .catch((error) => console.log(error));
    }, [props.flightId]);
  
    // Handle form input changes
    const handleInputChange = (event) => {
      setBookingDetails({
        ...bookingDetails,
        [event.target.name]: event.target.value,
      });
    };
  
    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      // Send booking details to API and handle response
      console.log(bookingDetails);   
    };
  
    // Render the component
    return (
      <div>
        
        <h1>Booking Page</h1>
        <p>Flight ID: {props.flightId}</p>
        <table>
            <td>
                <h2>Flight Details</h2>
            <p>Flight Number: {flight.FlightNumber}</p>
            <p>Departure Airport: {flight.Departure}</p>
            <p>Arrival Airport: {flight.Arrival}</p>
            <p>Departure Date and Time: {flight.DepartureDateTime}</p>
            <p>Arrival Date and Time: {flight.ArrivalDateTime}</p>            
            <p>Ticket Price: {flight.Price}</p>            
            </td>
            <td className='tblForm'>
            <h2>Booking Form</h2>
            <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className='form-label' for="name">Name:</Label>
            <Input className='form-input'
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for="email">Email:</Label>
            <Input className='form-input'
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for="ClientNIC">NIC:</Label>
            <Input className='form-input'
              type="text"
              name="ClientNIC"
              value={bookingDetails.ClientNIC}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className='form-label' for="ClientContactNum">Contact Number:</Label>
            <Input className='form-input'
              type="text"
              name="ClientContactNum"
              value={bookingDetails.ClientContactNum}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
        <Label className='form-label' for="CabinClass">Cabin Class:</Label>
        <Input className='form-input'
          type="select"
          name="CabinClass"
          id="CabinClass"
          value={bookingDetails.CabinClass}
          onChange={handleInputChange}
        >
          <option value="">Select Cabin Class</option>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label className='form-label' for="Seat">Seat:</Label>
        <Input className='form-input'
          type="select"
          name="Seat"
          id="Seat"
          value={bookingDetails.Seat}
          onChange={handleInputChange}
        >
          <option value="middle seat">Middle seat</option>
          <option value="Basic Widow">Basic Widow</option>
          <option value="Isle">Isle</option>
          <option value="A3">A3</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label className='form-label' for="Meal">Meal:</Label>
        <Input className='form-input'
          type="select"
          name="Meal"
          id="Meal"
          value={bookingDetails.Meal}
          onChange={handleInputChange}
        >
          <option value="">Select Meal</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Kosher">Kosher</option>
          <option value="Halal">Halal</option>
          <option value="Gluten-free">Gluten-free</option>
        </Input>
      </FormGroup>
      <br />
      <Button className='form-button' type="submit">Book Flight</Button>
    </Form>
 </td>
 </table>
  </div>
);
    }
export default BookingPage;

  
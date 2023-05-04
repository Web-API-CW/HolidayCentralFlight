import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BookingPage from './BookingPage';

function App() {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const [showBookingPage, setShowBookingPage] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/flights')
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const filteredFlights = flights.filter(flight => {
    let dateCondition = true;
    if (startDate && endDate) {
      dateCondition =
        new Date(flight.DepartureDateTime) >= startDate &&
        new Date(flight.DepartureDateTime) <= endDate;
    }
    if (filter === 'All') {
      return (
        flight.FlightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.Departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.Arrival.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.DepartureDateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.ArrivalDateTime.toLowerCase().includes(searchTerm.toLowerCase())
      ) && dateCondition;
    } else {
      return (
        flight[filter].toLowerCase().includes(searchTerm.toLowerCase()) && dateCondition
      );
    }
  });

  return (
    <div className="container">
    {showBookingPage ? (
      <BookingPage flightId={selectedFlightId} />
    ) : (
      <>
        <h1 className="title">Flight Data</h1>
        
          <div className="search">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select value={filter} onChange={handleFilter}>
              <option value="All">All</option>
              <option value="FlightNumber">Flight Number</option>
              <option value="Departure">Departure Airport</option>
              <option value="Arrival">Arrival Airport</option>
              <option value="DepartureDateTime">Departure Date and Time</option>
              <option value="ArrivalDateTime">Arrival Date and Time</option>
            </select>
            <div className="date-picker">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Departure Date"
                isClearable={true}
                showClearButton={true}
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="Arrival Date"
                isClearable={true}
                showClearButton={true}
              />
            </div>        
            <button className="search-button" onClick={() => {setSearchTerm('')
                    setStartDate(null);
                    setEndDate(null);
                  }}>
              Clear Search
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Flight Number</th>
                <th>Departure Airport</th>
                <th>Arrival Airport</th>
                <th>Departure Date and Time</th>
                <th>Arrival Date and Time</th>
                <th>Ticket Price</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
            {filteredFlights.map(flight => (
              <tr key={flight._id}>
                <td>{flight.FlightNumber}</td>
                <td>{flight.Departure}</td>
                <td>{flight.Arrival}</td>
                <td>{flight.DepartureDateTime}</td>
                <td>{flight.ArrivalDateTime}</td>
                <td>{flight.Price}</td>
                <td>
                  <button className="book-button" onClick={() => {
                    setShowBookingPage(true);
                    setSelectedFlightId(flight._id);
                  }}>Book</button>
                </td>
              </tr>
            ))}
            {filteredFlights.length === 0 && (
              <tr>
                <td colSpan="6" className="no-results">
                  No flights found
                </td>
              </tr>
            )}
          </tbody>
          </table>
        
        
      </>
    )}
    </div>
  );
}

export default App;

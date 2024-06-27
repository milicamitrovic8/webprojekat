import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import axios from 'axios';

import { slots } from '../utils/constants';

const VenuesReservation = () => {
  const [venues, setVenues] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState({ id: 1 });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venueSlots, setVenueSlots] = useState(slots);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getVenues = async () => {
      const res = await axios.get('http://localhost:5000/api/venues');
      setVenues(res.data.venues);
    };

    getVenues();
  }, []);

  useEffect(() => {
    const filterSlots = async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setVenueSlots([]);
      const responseVenueReservations = await axios.get(
        `http://localhost:5000/api/reservations/venue/${selectedVenue.id}`
      );
      const existingReservations = responseVenueReservations.data.reservations;
      let unavailableSlots = [];
      existingReservations.forEach((existingRes) => {
        if (format(existingRes.date, 'yyyy-MM-dd') === formattedDate) {
          unavailableSlots.push(existingRes.slot);
        }
      });

      let newSlots = [];
      slots.forEach((slot) => {
        if (!unavailableSlots.includes(slot.time)) {
          newSlots.push(slot);
        }
      });

      setVenueSlots(newSlots);
      setSelectedSlot(null);
    };

    filterSlots();
  }, [selectedVenue, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBooking = async () => {
    setError(null);
    if (selectedVenue && selectedDate && selectedSlot) {
      try {
        await axios.post('http://localhost:5000/api/reservations', {
          date: format(selectedDate, 'yyyy-MM-dd'),
          slot: selectedSlot,
          user_id: user,
          venue_id: selectedVenue.id,
        });

        navigate('/reservations');
      } catch (err) {
        console.log(err);
      }
    } else {
      setError('Please select all fields!');
      return;
    }
  };

  return (
    <div className="box-container">
      <div className="box">
        <h3 className="heading-3">Pick a Venue</h3>
        <div className="services-list">
          {venues?.map((venue) => (
            <div
              key={venue.id}
              className={`service-item ${
                selectedVenue?.name === venue.name && 'selected-service-item'
              }`}
              onClick={() => setSelectedVenue(venue)}
            >
              <div className="first-row">
                <div>
                  <p>{venue.name}</p>
                </div>
                <div>
                  <p>${venue.price}.00</p>
                </div>
              </div>
              <div className="second-row">
                <p>{venue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box">
        <h3 className="heading-3">Pick a Date</h3>
        <div className="date-picker">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            disabled={!selectedVenue}
          />
        </div>
      </div>

      <div className="box">
        {selectedVenue && (
          <>
            <h3 className="heading-3">Pick available Slot</h3>
            <div className="slots">
              {venueSlots.map((slot) => (
                <div key={slot.time}>
                  <button
                    type="button"
                    className={`${
                      selectedSlot === slot.time && 'selected-slot'
                    }`}
                    onClick={() => setSelectedSlot(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </button>
                </div>
              ))}
            </div>

            {selectedSlot && (
              <div className="btn-book">
                <button onClick={handleBooking} className="btn">
                  Book a Venue
                </button>
                {error && <p className="errorText">{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VenuesReservation;

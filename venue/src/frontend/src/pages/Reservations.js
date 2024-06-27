import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import ReservationCard from '../components/ReservationCard';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserReservations = async () => {
      const responseUserReservations = await axios.get(
        `http://localhost:5000/api/reservations/user/${user}`
      );
      setReservations(responseUserReservations.data.reservations);
    };

    getUserReservations();
  }, [flag]);

  return (
    <section className="reservations" id="pricing">
      <h1 className="heading">Your Reservations</h1>

      <div className="box-container">
        {reservations.length === 0 && (
          <>
            <h2 className="heading-3">
              You haven't booked any Venues!
              <br />
              <span onClick={() => navigate('/venues')}>Book one now!</span>
            </h2>
          </>
        )}
        {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
      </div>
    </section>
  );
};

export default Reservations;

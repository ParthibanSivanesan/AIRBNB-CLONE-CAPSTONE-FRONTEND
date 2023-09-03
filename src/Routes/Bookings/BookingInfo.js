import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import BookingDates from '../../Components/Bookings/BookingDates';
import Spinner from '../../Components/Spinner/Spinner';
import axiosConnect from '../../Token/axios';
import PlaceInfoComponent from '../../Components/Places/PlaceInfoComponent';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLeftLong, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

function BookingInfo() {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosConnect.get('/bookings');

      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id
      );

      setBooking(filteredBooking[0]);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }


  return (
    <div>
      <nav className="comp-section-div">
        <Link to={"/userprofile"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile</Link>
        <Link to={"/userprofile/bookings"} className="link-switch comp-section" ><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings</Link>
        <Link to={"/userprofile/places"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places</Link>
      </nav>

      <div className="App pad-mar">
        <Link to={"/"} className="link-switch comp-section" ><FontAwesomeIcon icon={faLeftLong} />&nbsp;&nbsp;Back To Home</Link>
      </div>

      <h4 className="pad-mar">Your Booking Informations</h4>

      {booking?.place ? (
        <div className="">
          <PlaceInfoComponent id={booking.place} />


          <div className="card-text">
            <BookingDates booking={booking} className="info-page pad-mar-sm" />
            <div className="pad-mar-sm">
              <FontAwesomeIcon icon={faMoneyCheckDollar} />&nbsp;&nbsp;
              <span>
                Total price: ₹&nbsp;&nbsp;{booking.price}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <h1> No data!</h1>
      )}
    </div>
  );
}

export default BookingInfo;
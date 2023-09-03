import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {differenceInCalendarDays} from 'date-fns';
import { UserContext } from '../../Context/UserContext';
import axiosConnect from '../../Token/axios';

function BookingCart({place}) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

    const navigate = useNavigate();
    // const {_id} = useParams();

    useEffect(() => {
        if (user) {
          setUserName(user.username);
        }
      }, [user]);
    
      let numberOfNights = 0;
      if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
      }
    
      async function bookNow() {
        const allFieldsFilled = username.trim() !== '';

        if (!allFieldsFilled) return toast.error('Please fill all the fields');
        try {
          const response = await axiosConnect.post('/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            username,
            phone,
            place: place._id,
            price: numberOfNights * place.price,
          });
    
          console.log("res.data",response)

          const bookingId = response.data.booking._id;
    
          setRedirect(`/userprofile/bookings/${bookingId}`);
          toast(`Congrats ${username}! Enjoy your trip.`);
        } catch (error) {
          console.log('Error: ', error);
        }
      }
    
      if (redirect) {
        return navigate(redirect);
      }



    return (
        <div>
           <hr />
            <div>
            <h5 className="bold-cls">Booking Info</h5>
              <div className="pad-mar-sm">
                <b>Price:</b>₹ {place.price} / per night
              </div>
              <div>
                <div>
                  <div className="pad-mar-sm">
                    <label className="bold-cls">Check In: &nbsp;&nbsp;</label>
                    <input type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}/>
                  </div>
                  <div className="pad-mar-sm">
                    <label className="bold-cls">Check Out:&nbsp;&nbsp;</label>
                    <input type="date" value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}/>
                  </div>
                </div>
                <div className="pad-mar-sm">
                  <label className="bold-cls">Number of guests:&nbsp;&nbsp;</label>
                  <input type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}/>
                </div>
                {numberOfNights > 0 && (
                  <div>
                  <div className="pad-mar-sm">
                    <label className="bold-cls">Your full name:&nbsp;&nbsp;</label>
                    <input type="text"
                          value={username}
                          onChange={(e) => setUserName(e.target.value)}/>
                    </div>

                    <div className="pad-mar-sm">
                    <label className="bold-cls">Phone number:&nbsp;&nbsp;</label>
                    <input type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}/>
                  </div>
                  </div>
                )}
              </div>

              <div className="btn-login">
              <button onClick={bookNow} className="btn-show">
                Book Now
                {numberOfNights > 0 && (
                  <span> ₹ {numberOfNights * place.price}</span>
                )}
              </button>
              </div>

            </div>
        </div>
    );
}

export default BookingCart;
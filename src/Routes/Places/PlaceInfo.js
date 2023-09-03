import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLeftLong } from '@fortawesome/free-solid-svg-icons';

import PlaceGallery from '../../Components/Places/PlaceGallery';
import Address from '../../Components/Places/Address';
import BookingCart from '../../Components/Bookings/BookingCart';
import Spinner from '../../Components/Spinner/Spinner';
import PerksGallery from '../../Components/Perks/PerksGallery';
import axiosConnect from '../../Token/axios';


function PlaceInfo() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axiosConnect.get(`/places/${id}`);
      setPlace(data.place);
      setLoading(false);
    };
    getPlace();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }


  return (
    <div>
      <nav className="comp-section-div">
        <Link to={"/userprofile"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile</Link>
        <Link to={"/userprofile/bookings"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings</Link>
        <Link to={"/userprofile/places"} className="link-switch comp-section" ><FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places</Link>
      </nav>

      <div className="App pad-mar">
        <Link to={"/"} className="link-switch comp-section" ><FontAwesomeIcon icon={faLeftLong} />&nbsp;&nbsp;Back To Home</Link>
      </div>


      <div className="pad-mar">
        <h3 className="">{place.title}</h3>

        <Address placeAddress={place.address}></Address>
        <PlaceGallery place={place} />
        <div className="">
          <div>
            <div className="">
              <h5 className="bold-cls">Description</h5>
              {place.description}
            </div>
            Check-in: {place.checkIn}<br />
            Check-out: {place.checkOut}<br />
            Max number of guests: {place.maxGuests}
            <PerksGallery perks={place?.perks} />
          </div>
        </div>
        <hr />
        <div className="">
          <div>
            <h5 className="bold-cls">Extra Info</h5>
          </div>
          <div className="">{place.extraInfo}</div>
        </div>

        <div>
          <BookingCart place={place} />
        </div>
      </div>



    </div>
  );
}

export default PlaceInfo;
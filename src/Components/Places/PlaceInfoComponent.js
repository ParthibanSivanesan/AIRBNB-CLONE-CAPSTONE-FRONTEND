import React from 'react';
import { useState, useEffect } from 'react';
import axiosConnect from 'axios';
import Spinner from '../Spinner/Spinner';
import PlaceGallery from './PlaceGallery';
import Address from './Address';

function PlaceInfoComponent({ id }) {

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
        <div className="pad-mar">
            <span className="info-page" >
                <h4 style={{ textDecoration: "none" }}>{place.title}</h4><br></br>
            </span>

            <div>
                <Address placeAddress={place.address} />
            </div>

            <PlaceGallery place={place} />


        </div>
    );
}

export default PlaceInfoComponent;
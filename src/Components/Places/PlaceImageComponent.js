import React from 'react';
import { useState, useEffect } from 'react';
import axiosConnect from '../../Token/axios';
import Spinner from '../Spinner/Spinner';

function PlaceImageComponent({ id, className = null }) {
    // const { id } = useParams();
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
                <img className="card-img-top card-img col-md-4" src={place.photos[0]} alt="" style={{ width: "120px", height: "120px" }} />
                <h4 style={{ textDecoration: "none" }}>{place.title}</h4><br></br>
                <div>
                    <p>{place.address}</p>
                </div>

            </span>
        </div>
    );
}

export default PlaceImageComponent;
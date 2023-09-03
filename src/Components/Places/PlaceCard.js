import React from 'react';
import { Link } from 'react-router-dom';
import PlaceImages from './PlaceImages';

function PlaceCard({ place }) {
    return (
        <div className="card-box m-2 col">
            <Link
                to={`/userprofile/places/${place._id}`}
                className="card-txt card place-card"
                key={place._id}
            >
                <div className="">
                    <PlaceImages place={place} />
                </div>
                <div className="card-body App">
                    <h4 className="card-title" style={{ textDecoration: "none" }}>{place.title}</h4>
                    <p className="card-text">{place.address}</p>
                </div>
            </Link>
        </div>
    );
}

export default PlaceCard;
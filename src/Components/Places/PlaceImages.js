import React from 'react';

function PlaceImages({ place, className = null }) {
    return (
        <div>
            <img className="card-img-top card-img" src={place.photos[0]} alt="" />
        </div>
    );
}

export default PlaceImages;
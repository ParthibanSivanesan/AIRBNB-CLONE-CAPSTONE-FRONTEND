import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Address({ placeAddress }) {

    return (
        <div>
            <a className="address-link" target="_blank" href={`https://maps.google.com/?q=${placeAddress}`}>
                <FontAwesomeIcon icon={faLocationDot} /> &nbsp; &nbsp;
                {placeAddress}
            </a>
        </div>
    );
}

export default Address;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDog, faDoorOpen, faRadio, faDumbbell, faSpa, faMotorcycle } from '@fortawesome/free-solid-svg-icons';


function PerksGallery({ perks }) {
    return (
        <div>
            <hr />
            <h5 className="bold-cls">What this place offers</h5>

            <div>
                <div>
                    <FontAwesomeIcon icon={faWifi} />
                    <label for="Wifi" className={`${perks?.includes('wifi') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Wifi</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faTv} />
                    <label for="TV" className={`${perks?.includes('tv') ? '' : 'strike-out'}`}>&nbsp;&nbsp;TV</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faCarSide} />
                    <label for="parking" className={`${perks?.includes('freeparkingspot') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Free Parking Spot</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faRadio} />
                    <label for="Radio" className={`${perks?.includes('radio') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Radio</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faDog} />
                    <label for="Pets" className={`${perks?.includes('pets') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Pets</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faMotorcycle} />
                    <label for="Bike Rental" className={`${perks?.includes('bike') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Bike Rental</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faSpa} />
                    <label for="Spa Day" className={`${perks?.includes('spa') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Spa Day</label>
                </div>
                <div>
                    <FontAwesomeIcon icon={faDumbbell} />
                    <label for="Gym" className={`${perks?.includes('gym') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Gym</label>
                </div>

                <div>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <label for="Private Entrance" className={`${perks?.includes('entrance') ? '' : 'strike-out'}`}>&nbsp;&nbsp;Private Entrance</label>
                </div>
            </div>
        </div>
    );
}

export default PerksGallery;
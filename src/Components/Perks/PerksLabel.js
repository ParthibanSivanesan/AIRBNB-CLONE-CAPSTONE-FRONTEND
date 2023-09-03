import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faCarSide, faTv, faDog, faDoorOpen, faRadio, faDumbbell, faSpa, faMotorcycle } from '@fortawesome/free-solid-svg-icons';

function PerksLabel({ selected, onChange }) {

    function handlecheckbox(e) {

        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }

    }


    return (
        <div className="container text-center">
            <div className="row row-cols-4 gap-1">

                <div className="col wrapper">
                    <input type="checkbox" id="Wifi" name="wifi" value="Wifi" checked={selected.includes('wifi')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faWifi} />
                    <label>Wifi</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="TV" name="tv" value="TV" checked={selected.includes('tv')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faTv} />
                    <label>TV</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="freeparkingspot" name="parking" value="Free Parking Spot" checked={selected.includes('parking')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faCarSide} />
                    <label>Free Parking Spot</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="Radio" name="radio" value="Radio" checked={selected.includes('radio')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faRadio} />
                    <label>Radio</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="Pets" name="pets" value="Pets" checked={selected.includes('pets')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faDog} />
                    <label>Pets</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="Bike Rental" name="bike" value="Bike Rental" checked={selected.includes('bike')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faMotorcycle} />
                    <label>Bike Rental</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="Spa Day" name="spa" value="Spa Day" checked={selected.includes('spa')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faSpa} />
                    <label>Spa Day</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="Gym" name="gym" value="Gym" checked={selected.includes('gym')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faDumbbell} />
                    <label>Gym</label>
                </div>

                <div className="col wrapper">
                    <input type="checkbox" id="privateentrance" name="entrance" value="Private Entrance" checked={selected.includes('entrance')} onChange={handlecheckbox}></input>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    <label>Private Entrance</label>
                </div>
            </div>
        </div>
    );
}

export default PerksLabel;
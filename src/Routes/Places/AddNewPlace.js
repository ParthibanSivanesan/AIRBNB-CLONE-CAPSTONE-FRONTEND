import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity } from '@fortawesome/free-solid-svg-icons';

import PerksLabel from '../../Components/Perks/PerksLabel';
import UserProfileNav from '../../Components/User/UserProfileNav';
import ImagesUploader from '../../Components/Images/ImagesUploader';
import Spinner from '../../Components/Spinner/Spinner';
import axiosConnect from '../../Token/axios';



function AddNewPlace() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(1500);
    const [loading, setLoading] = useState(false);

    // const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        setLoading(true);
        axiosConnect.get(`/places/${id}`).then((response) => {
            const { place } = response.data;
            setTitle(place.title);
            setAddress(place.address);
            setAddedPhotos(place.photos);
            setDescription(place.description);
            setPerks(place.perks);
            setExtraInfo(place.extraInfo);
            setCheckIn(place.checkIn);
            setCheckOut(place.checkOut);
            setMaxGuests(place.maxGuests);
            setPrice(place.price);
            setLoading(false);
        });
    }, [id]);

    const inputHeader = (text) => {
        return (
            <label className="form-label bold-cls">{text}</label>
        )
    }

    const inputDescription = (text) => {
        return (
            <p className="font-min">{text}</p>
        )
    }

    const preInput = (header, description) => {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }

    async function addNewPlace(e) {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price,
        };
        if (id) {

            const { data } = await axiosConnect.put('/places/update-place', {
                id, ...placeData,
            });
        } else {

            const { data } = await axiosConnect.post(
                '/places/add-places',
                placeData
            );
        }

        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={'/userprofile/places'} />
    }

    if (loading) {
        return <Spinner />;
    }


    return (
        <div>
            <nav className="comp-section-div">
                <Link to={"/userprofile"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile</Link>
                <Link to={"/userprofile/bookings"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings</Link>
                <Link to={"/userprofile/places"} className="link-switch comp-section" ><FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places</Link>
            </nav>
            <h4 className="App pad-mar">Add New Place</h4>
            <div className="main-card-style">

                <form className="px-4 py-3" onSubmit={addNewPlace}>

                    <div className="mb-3">
                        {preInput("Title", "Title for your place, should be short and catchy as in advertisement")}
                        <input type="text" className="form-control inp-bar" placeholder="title, for ex: My Lovely apartment" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        {preInput("Address", "Address to this place")}
                        <input type="text" className="form-control inp-bar" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        {preInput("Photos", "More equals better")}
                        <ImagesUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
                    </div>

                    <div className="mb-3">
                        {preInput("About this space", "Description about the Place")}
                        <textarea className="form-control" placeholder="Describe about place" id="floatingTextarea2" style={{ height: "100px" }} value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>

                    <div className="mb-3">
                        {preInput("Perks", "Select all the Perks")}
                        <PerksLabel selected={perks} onChange={setPerks} />
                    </div>

                    <div className="mb-3">
                        {preInput("Extra Info", "About House rules, etc.")}
                        <textarea className="form-control" id="floatingTextarea2" style={{ height: "70px" }} value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} ></textarea>
                    </div>

                    <div className="mb-3">
                        {preInput("Check-In | Check-Out | Max Guests", "Update check-in, check-out times & maximum guests")}
                        <div className="container text-center">
                            <div className="row row-cols-4 gap-1">
                                <div className="col">
                                    <label className="bold-cls-sm">Check - In</label>
                                    <input type="number" className="form-control inp-bar-sm" placeholder="15:00" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                                </div>

                                <div className="col">
                                    <label className="bold-cls-sm">Check - Out</label>
                                    <input type="number" className="form-control inp-bar-sm" placeholder="23:00" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                                </div>

                                <div className="col">
                                    <label className="bold-cls-sm">Max Guests</label>
                                    <input type="number" className="form-control inp-bar-sm" placeholder="Ex. 5" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        {preInput("Price", "Price Per Night")}
                        <input type="text" className="form-control inp-bar" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <button className="form-control comp-section">Save Details</button>
                    </div>


                </form>
            </div>
        </div>
    );
}

export default AddNewPlace;
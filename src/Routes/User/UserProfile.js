import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faBook, faCity, faLeftLong } from '@fortawesome/free-solid-svg-icons';

import { UserContext } from '../../Context/UserContext';
import Places from '../Places/Places';
import { removeItemFromLS } from '../../Token/script';


function UserProfile() {

    const { user, signout } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);


    let { subpage } = useParams();
    if (!subpage) {
        subpage = 'userprofile';
    }

    function handlesignout() {
        try {
            signout();
            removeItemFromLS('token');
            toast.success('Signed out');
            setRedirect('/');
        }
        catch (err) {
            console.log(err);
        }
    }


    if (!user && !redirect) {
        return <Navigate to={'/signin'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }



    return (
        <div>
            <nav className="comp-section-div">
                <Link to={"/userprofile"} className="link-switch comp-section" ><FontAwesomeIcon icon={faStreetView} />&nbsp;&nbsp;My Profile</Link>
                <Link to={"/userprofile/bookings"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faBook} />&nbsp;&nbsp;My Bookings</Link>
                <Link to={"/userprofile/places"} className="link-switch comp-section-disable" ><FontAwesomeIcon icon={faCity} />&nbsp;&nbsp;My Places</Link>
            </nav>

            <div className="App pad-mar">
                <Link to={"/"} className="link-switch comp-section" ><FontAwesomeIcon icon={faLeftLong} />&nbsp;&nbsp;Back To Home</Link>
            </div>

            {subpage === 'userprofile' && (
                <div className="App heading-accountpg">
                    <div><span className="bold-cls">UserName: </span>{user.username}</div>
                    <div><span className="bold-cls">Email: </span>{user.email}</div>
                    <div>
                        <button className="btn-sign pad-mar" onClick={handlesignout}>SignOut</button>
                    </div>
                </div>
            )}
            {subpage === 'places' && (
                <Places />
            )}
        </div>
    );
}

export default UserProfile;
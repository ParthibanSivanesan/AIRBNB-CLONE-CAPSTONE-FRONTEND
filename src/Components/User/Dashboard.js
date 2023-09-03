import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import FrontPage from '../../Routes/User/FrontPage';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { removeItemFromLS } from '../../Token/script';
import { toast } from 'react-toastify';


function Dashboard() {

    const { user, signout } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

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

    return (
        <div className="p-3">
            <Header />
            {/* <Outlet /> */}
            <div className="">
                <FrontPage />
            </div>

            {user ?
                <div className="App">
                    <button className="btn-sign pad-mar" onClick={handlesignout}>
                        Signout
                    </button>
                </div>
                :
                <div className="App pad-mar">
                    <Link to={"/signin"} className="link-switch comp-section btn-sign" >SignIn</Link>
                </div>
            }


        </div>
    );
}

export default Dashboard;
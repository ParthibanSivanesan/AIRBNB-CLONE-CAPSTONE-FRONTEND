import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'; 
import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContextProvider } from './Context/UserContext';
import { PlaceContextProvider } from './Context/PlaceContext';
import FrontPage from './Routes/User/FrontPage';
import Dashboard from './Components/User/Dashboard';
import SignIn from './Routes/User/SignIn';
import SignUp from './Routes/User/SignUp';
import UserProfile from './Routes/User/UserProfile';
import Places from './Routes/Places/Places';
import PlaceInfo from './Routes/Places/PlaceInfo';
import AddNewPlace from './Routes/Places/AddNewPlace';
import Bookings from './Routes/Bookings/Bookings';
import BookingInfo from './Routes/Bookings/BookingInfo';
import axiosConnect from './Token/axios';
import { getItemFromLS } from './Token/script';



function App() {
  
  useEffect(() => {
    axiosConnect.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${getItemFromLS('token')}`;
  }, []);
  return (
    <UserContextProvider>     
    <PlaceContextProvider>  
        <Routes>
            <Route exact path="/" element={<Dashboard />}> </Route>
            <Route path="/frontpage" element={<FrontPage />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/userprofile" element={<UserProfile />}></Route>
            <Route path="/userprofile/bookings" element={<Bookings />}></Route>
            <Route path="/userprofile/bookings/:id" element={<BookingInfo />}></Route>
            <Route path="/userprofile/places" element={<Places />}></Route>
            <Route path="/userprofile/places/new" element={<AddNewPlace />}></Route>
            <Route path="/userprofile/places/:id" element={<AddNewPlace />}></Route>
            <Route path="/place/:id" element={<PlaceInfo />}></Route>
            <Route path="/" element={<Navigate replace to="/signin" />} />
          
        </Routes>
        <ToastContainer autoClose={3000} transition={Slide} />
    </PlaceContextProvider>
    </UserContextProvider>
    
  );
}

export default App;

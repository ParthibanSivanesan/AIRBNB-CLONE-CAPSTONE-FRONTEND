import { createContext } from "react";
import { useState, useEffect } from "react";
import axiosConnect from "../Token/axios";
import { getItemFromLS, setItemsInLS, removeItemFromLS } from "../Token/script";


export const UserContext = createContext({});

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = getItemFromLS('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);

        setItemsInLS('user', JSON.stringify(userData));

    };

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);

        removeItemFromLS('user');
   
        delete axiosConnect.defaults.headers.common['Authorization'];
    };


    return (
        <UserContext.Provider value={{ user, isLoggedIn, signin: handleLogin, signout: handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}
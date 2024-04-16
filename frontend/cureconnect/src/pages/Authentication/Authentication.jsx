import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Authentication = React.createContext();

    export function useAuth(){
        return useContext(Authentication);
    }

    export function AuthProvider({ children }) {

        const [currentUser, setCurrentUser] = useState(null);
        const [userLoggedIn, setuserLoggedIn] = useState(false);
        const [loading, setLoadiung] = useState(true);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, initializeUser);
            return unsubscribe;
        }, [])

    async function initializeUser(user){

        if(user){
            setCurrentUser({...user});
            setuserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setuserLoggedIn(false);
        }
        setLoadiung(false);

    }

    const value ={
    currentUser,
    userLoggedIn,
    loading
    }
    
    return (
        <Authentication.Provider value={value}>
          {!loading && <>{children}</>}
        </Authentication.Provider>
      );
}
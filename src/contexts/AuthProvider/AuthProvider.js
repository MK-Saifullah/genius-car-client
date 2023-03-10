import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)  
    
    //User email and password
    
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    //Login user
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    // Logout user
    const logOutUser = (email, password) => {
        localStorage.removeItem('genius-car-token')
        return signOut(auth, email, password)
    }
    
    // google user
    // const googleProvider = new GoogleAuthProvider();
    const googleUser = (googleProvider) => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Current User: ', currentUser)
            setUser(currentUser)
            setLoading(false);
        })
        return () => {
            return unSubscribe()
        };
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        googleUser,
        logOutUser
    }
    return (
        <AuthContext.Provider value ={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth"

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)  

    //User email and password

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //Login user
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google user
    const googleUser = (googleProvider) => {
        return signInWithPopup(auth, googleProvider)
    }

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('Current User: ', currentUser)
            setUser(currentUser)
        })
        return () => unSubscribe();
    }, [])

    const authInfo = {
        user,
        loader,
        createUser,
        loginUser,
        googleUser,
    }
    return (
        <AuthContext.Provider value ={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
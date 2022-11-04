import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config'


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user inside auth state change', currentUser);
            if (currentUser === null || currentUser.emailVerified) {
                setuser(currentUser)
            }

            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const providerLogIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password, name, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password, name, photoURL)
    }

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const varificationEmail = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const userProfileUpdated = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const authInfo = {
        providerLogIn,
        user,
        logOut,
        createUser,
        logIn,
        userProfileUpdated,
        varificationEmail,
        setLoading,
        loading

    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
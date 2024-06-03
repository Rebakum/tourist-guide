import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {  GoogleAuthProvider,  } from "firebase/auth";
import auth from "../firebaseConfig";


export const AuthContext = createContext(null);

//-------social auth Provider----
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    // console.log(currentUser)

    //-------createUser------
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };



    //-----signIn-user--------

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };
    //------google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    // updateUserProfile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
           
    };
   

    //------logout-------
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    //----- observer----
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setUser(user)

        });


    }, [loading])


    const allValue = {
        user,
        setUser,
        createUser,
        signInUser,
        googleLogin,
        updateUserProfile,
        loading,
        logOut
    }
    return (
        <div>
            <AuthContext.Provider value={allValue}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
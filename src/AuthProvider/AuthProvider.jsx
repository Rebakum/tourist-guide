import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, } from "firebase/auth";
import auth from "../firebaseConfig";
import useAxiosPublic from "../Hook/useAxiosPublic";
import axios from "axios";


export const AuthContext = createContext(null);

//-------social auth Provider----
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();
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
        const unsubsccribe = onAuthStateChanged(auth, (user) => {

            // console.log('currentUser', user)
            if (user) {
                //get token store client
                const userInfo = { email: user.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {

                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setUser(user)
                            setLoading(false)
                        }
                    })

            } else {
                //TODO: remove token
                setUser(user)
                setLoading(false)
                localStorage.removeItem('access-token')
            }



        });
        return () => {
            unsubsccribe()
        }



    }, [axiosPublic])


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
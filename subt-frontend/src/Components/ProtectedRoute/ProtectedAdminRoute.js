import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase-config";
import {
    collection,
    getDocs,
    query,
    where,
} from "@firebase/firestore";
import { useEffect, useState, useCallback } from "react";

const ProtectedAdminRoute = ({ children }) => {
    const { user } = useUserAuth();
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState([])
    const mountedRef = useRef(true)

    const getUserRole = useCallback(async () => {
        try {
            let getPostsFromFirebase = [];
            let querySnapshot = await getDocs(
                query(collection(db, "users"), where("id", "==", user.uid))
            );
            querySnapshot.forEach((doc) => {
                getPostsFromFirebase.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setCurrentUser(getPostsFromFirebase)
            setLoading(false);
            return () => querySnapshot();
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [user.uid])
    useEffect(() => {
        if (loading && user.uid !== undefined) {
            try {
                getUserRole()
            } catch (error) {
                console.log(error)
            }
        }
        return () => mountedRef;
    }, [getUserRole, loading, user.uid])

    if (currentUser[0]?.role !== undefined && currentUser[0]?.role !== "admin") {
        return <Navigate to="/main" />;
    }
    return children;
};

export default ProtectedAdminRoute;
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);
    if (loading) {
        return <div>Loading...</div>; // You can display a spinner or loading component here
    }
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
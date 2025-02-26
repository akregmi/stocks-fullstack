import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return(
        <h1>Welcome {user.fullname}</h1>
    );
}

export default Dashboard;
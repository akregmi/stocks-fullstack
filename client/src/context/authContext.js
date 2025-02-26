import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/api/auth/login", { email, password });
            const {token, user} = res.data;
            localStorage.setItem("token", token);
            setUser(user);
            return({})
        } catch (error) {
            console.error("Login failed:", error);
            return({
                error: error.response.data.error
            })
        }
    };

    const register = async (firstName, lastName, email, password) => {
        try {
            const res = await axios.post("/api/auth/signup", { firstName, lastName, email, password });
            const {token, user} = res.data;
            localStorage.setItem("token", token);
            setUser(user);
            return ({});
        } catch (error) {
            console.error("Registration failed:", error.response.data);
            return ({
                error: error.response.data.error
            })
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const res = await axios.get("/api/user/", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data.user);
                } catch (error) {
                    console.error("User fetch failed:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
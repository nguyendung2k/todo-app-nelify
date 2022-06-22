
import React, { useContext } from "react";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { AuthContext } from "../store/auth-context";

const LayoutLogin = () => {
    const contextLogin = useContext(AuthContext);

    return (
        <>
            {!contextLogin.isLoggedIn && <Login />}
            {contextLogin.isLoggedIn && <Home />}
        </>
    );
};

export default LayoutLogin;

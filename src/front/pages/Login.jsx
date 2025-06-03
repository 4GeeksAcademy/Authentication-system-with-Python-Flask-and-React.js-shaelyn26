import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = () => {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // "email": email,
                // "password": password,
                "email": loginEmail,
                "password": loginPassword
            })
        }
        fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", option)
            .then((resp) => {
                return resp.json()
            })

            .then((data) => {
                console.log(data.token_value, "this is my agenda")
                dispatch({ type: "updateToken", payload: data.token_value });
                navigate("/demo")
            })
        }
    return (
        <div className="container">
            <div>
                <input onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} type="text" placeholder="Login Email" />

                <input onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} type="text" placeholder="Login Password" />

                <button onClick={() => login()}> Login </button>
            </div>
        </div>
    );
};
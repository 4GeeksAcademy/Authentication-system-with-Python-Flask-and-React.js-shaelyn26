import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loginEmail, setLoginEmail] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");


    const signup = async (email, password) => {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, password: password
            })
        }
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", option);
            .then((resp) => {
                return resp.json();
            })

            .then((data) => {
                console.log(data.token_value, "this is my agenda");
                dispatch({ type: "updateToken", payload: data.token_value });
            })
    };
    // <-- 'data.token_value' is the actual info recieved from the Return jsonify, 
    // which received info from its 'route' that the fetch url sent. ALL info was received 
    // from the information put in the input.


    // useEffect(() => {
    //     loadMessage()
    //     sessionStorage.setItem("testItem", "test1")
    // }, []); 
                // dont know if i still need this ^^^


    return (
        <div classsName="container">
            <div>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Signup Email" />

                <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Signup Password" />

                <button onClick={() => signup(email, password)}> Sign Up </button>

            </div>
        </div>
    );
};

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
        await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", option)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data.token_value, "this is my agenda")
                dispatch({ type: "updateToken", payload: data.token_value })
            })
    }
    // <-- 'data.token_value' is the actual info recieved from the Return jsonify, 
    // which received info from its 'route' that the fetch url sent. ALL info was received 
    // from the information put in the input.

    return (
        <div classsName="container">
            <div className="text-center mb-5">
                <h1>Welcome to the Signup!</h1>
            </div>
            <form>
                <div class="m-3 text-center">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Signup Email" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="m-3 text-center">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Signup Password" />
                </div>
                <div class="m-3 text-center">
                    <button
                        // className="dflex"
                        onClick={() => signup(email, password)}> Sign Up </button>
                </div>
            </form>
        </div>
    );
};

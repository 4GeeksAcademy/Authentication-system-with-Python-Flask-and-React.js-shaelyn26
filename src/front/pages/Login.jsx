import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loginEmail, setLoginEmail] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");

    const login = async (email, password) => {
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        };

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", option);
        console.log("RAW response:", response);

        const data = await response.json();
        console.log("PARSED JSON:", data);

        if (response.ok) {
            localStorage.setItem("token_value", data.token_value);
            dispatch({ type: "updateToken", payload: data.token_value });
            navigate("/private");
        } else {
            console.error("Login failed:", data);
        }

        return { data, status: response.status };
    };

    return (
        <div className="container">
            <div className="text-center mb-5">
                <h1>Welcome to the Login!</h1>
            </div>
            <form>
                <div className="m-3 text-center">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                </div>
                <div className="m-3 text-center">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Login Password" />
                </div>
                <div className="m-3 text-center">
                    <button
                        onClick={(e) => { e.preventDefault(); login(email, password) }}> Login </button>
                </div>
            </form>
        </div>
    );
};
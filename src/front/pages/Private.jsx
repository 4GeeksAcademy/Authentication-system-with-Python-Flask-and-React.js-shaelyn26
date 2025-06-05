import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Private = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";


    useEffect(() => {
        const token = localStorage.getItem("token_value");
        // line13-14--> useEffect runs after the component render and recieves a 'key'(token) from the browsers' sessionStorage.
        // sessionStorage --> duration of browsers session

        if (!token) {
            navigate("/login");                      //[ navigate() ] allows to redirect the route of page
            return;
        }
        fetch(`${backendUrl}/api/private`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message || "Restricted Access!");
                    });
                }
                return response.json();
            })
            .then(data => {
                setUserData(data.message);
                setLoading(false);                  // this tells the page it finished 'loading'
                console.log(data.message, "Private Page!");
            })
            .catch((err) => {
                setError(error.message)
                console.log(err, "Message Error");
                navigate("/");
            });
    }, [navigate, backendUrl]);

    if (loading) return <p>Loading. . .</p>

    return (
        <div className="text-center">
            <h1>Private </h1>
            <div className="alert alert-danger m-3" role="alert">
                <p>Authorized User Only!</p>
            </div>
            <div className="container">

                {/* testing */}
                <p> {userData.email} is logged in</p>
                {/* testing */}

            </div>
            <div>
                <Link to="/">
                    <button onClick={() =>
                        dispatch({ type: "updateToken", payload: null })
                    } className="logout">
                        Log Out
                    </button>
                </Link>
            </div>
        </div>
    );

};
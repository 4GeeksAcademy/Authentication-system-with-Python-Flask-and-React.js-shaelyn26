import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate()

	const { store, dispatch } = useGlobalReducer()
	const [email, setEmail] = useState("")
	const [loginEmail, setLoginEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loginPassword, setLoginPassword] = useState("")

	// const loadMessage = async () => {
	// 	try {
	// 		const backendUrl = import.meta.env.VITE_BACKEND_URL

	// 		if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

	// 		const response = await fetch(backendUrl + "/api/hello")
	// 		const data = await response.json()

	// 		if (response.ok) dispatch({ type: "set_hello", payload: data.message })

	// 		return data

	// 	} catch (error) {
	// 		if (error.message) throw new Error(
	// 			`Could not fetch the message from the backend.
	// 			Please check if the backend is running and the backend port is public.`
	// 		);
	// 	}

	// }
	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}
		fetch(import.meta.env.VITE_BACKEND_URL + "/login", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data.token_value, "this is my agenda")
				dispatch({ type: "updateToken", payload: data.token_value })
				navigate("/demo")
			})
	}
	// updates token based off this dispatch & token received to update store variable

	const signup =async (email,password) => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email, password
			})
		}
		await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data.token_value, "this is my agenda")
				dispatch({ type: "updateToken", payload: data.token_value })
			})
	}
	// <-- 'data.token_value' is the actual info recieved from the Return jsonify, 
	// which received info from its 'route' that the fetch url sent. ALL info was received 
	// from the information put in the input.


	// useEffect(() => {
	// 	loadMessage()
	// 	sessionStorage.setItem("testItem", "test1")
	// }, [])
	// const testSession = sessionStorage.getItem("testItem")

	return (
		<div>
			<input onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} type="text" placeholder="Login Email" />

			<input onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} type="text" placeholder="Login Password" />

			<button onClick={() => login()}> Login </button>
			{/* both inputs type at the same time.. FIND ISSUE */}

			<div>
				<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Signup Email" />

				<input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Signup Password" />

				<button onClick={() => signup(email,password)}> Sign Up </button>
				{/* <-- for the 'signup button' it's essentially the same but will 
		need 2 pairs of useStates to differentiate which input you'll be using. OR
		2 components for each one (log in compo & sign up compo) */}

				{/* <button onClick={() => sessionStorage.setItem("testItem", "test2")}> Testing </button>
				Here is the test : {testSession} */}
			</div>
		</div>
	);
};

// / how to log in and go to a different page
// 1. go to Routes.jsx
// 2. add navigate PATH TO login in then response after dispatch
// 3. add a "private page" with the instructions above
// 4. login, refresh as it stays logged in with sessions

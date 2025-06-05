import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

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
	useEffect(() => {
		//loadMessage()
	}, [])
	return (
		<div className="text-center mt-5">
			<div className="container">
				<h1>Coder's Blog</h1>
				<div>
					<img src="https://i.pinimg.com/736x/ca/da/aa/cadaaa748a278eb49e4f3a2c756ac637.jpg" />
				</div>
				<Link to={"/login"}><button>Go to Login</button></Link>
				<Link to={"/signup"}><button>Go to Sign Up</button></Link>
				{/* <div className="alert alert-info">
					{store.message ? (
						<span>{store.message}</span>
					) : (
						<span className="text-danger">
							Loading message from the backend (make sure your python 🐍 backend is running)...
						</span>
					)}
				</div> */}
			</div>
		</div>
	);
}; 

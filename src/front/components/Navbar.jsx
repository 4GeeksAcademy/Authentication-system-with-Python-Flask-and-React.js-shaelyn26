import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
					{store.token != null ?    
						<div>
							Bank Account 7632103882
						</div>
						: "You're not logged in!"}
												{/* lines 13 to 26 doesn't make sense in live page */}
					<div>
						<Link to="/">
						<button onClick={() =>
							dispatch({ type: "updateToken", payload: null })
						} className="logout">
							Log Out
						</button>
						</Link>
								{/* once this button is clicked, nothing happens.. need to redirect button to home page "<Link>" */}
					</div>

				</div>

							{/* this goes to the home page */}
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
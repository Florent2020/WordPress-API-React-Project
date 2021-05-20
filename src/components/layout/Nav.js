import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Nav() {
	const [auth, setAuth] = useContext(AuthContext);

	const history = useHistory();

	function logout() {
		setAuth(null);
		history.push("/");
		localStorage.clear();
	}


	return (
		<nav>
			<div className="container">


			{auth ? (
				<>
				<Link to="/">Home</Link>
				<Link to="/admin">Admin</Link>
				<button className="logout--button" onClick={logout}>Log out</button>
				</>
			) : (
				<Link to="/">Home</Link>
			)}
			</div>
		</nav>
	);
}

export default Nav;
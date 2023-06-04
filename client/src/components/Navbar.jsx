import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "../css/Navbar.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="navBody">
			<nav className="navMenu">
				<Link className="homeLink" exact to="/">
					Home
				</Link>

				{sessionUser ? (
					<div>{<ProfileButton user={sessionUser} />}</div>
				) : (
					<div>
						<Link className="loginLink" to="/login">
							Log In
						</Link>
						<Link className="signupLink" to="/signup">
							Sign Up
						</Link>
					</div>
				)}
				<div className="dot"></div>
			</nav>
		</div>
	);
}

export default Navigation;

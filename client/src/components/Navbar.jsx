import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<li>
				<ProfileButton user={sessionUser} />
			</li>
		);
	} else {
		sessionLinks = (
			<li>
				<Link to="/login">Log In</Link>
				<Link to="/signup">Sign Up</Link>
			</li>
		);
	}

	return (
		<ul>
			<li>
				<Link exact to="/">
					Home
				</Link>
			</li>
			{isLoaded && sessionLinks}
		</ul>
	);
}

export default Navigation;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div>
			<div>
				<Link exact to="/">
					Home
				</Link>
			</div>
			<div>
				{sessionUser ? (
					<div>{<ProfileButton user={sessionUser} />}</div>
				) : (
					<div>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;

import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function ProfileButton({ user }) {
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();

	const openMenu = () => {
		setShowMenu(!showMenu);
	};

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<div>
			<button onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu ? (
				<div className="dropDownMenu">
					<Link className="loggedInEmail"> {user.email} </Link>
					<button onClick={logout}>Log Out</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default ProfileButton;

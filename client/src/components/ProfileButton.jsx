import React, { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../css/ProfileButton.css";

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
		<div className="dropdown">
			<button className="profileButton" onClick={openMenu}>
				<i className="fas fa-user-circle" />
			</button>
			{showMenu ? (
				<div className="dropdownMenu">
					<Link className="dropdownContent"> {user.email} </Link>
					<Link className="dropdownContent" onClick={logout}>
						Log Out
					</Link>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default ProfileButton;

import { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../css/AuthForm.css";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) {
		return <Navigate to="/" />;
	}

	const handleLogin = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.message) {
					setErrors(data.errors);
				}
			}
		);
	};

	return (
		<div className="formWrapper">
			<form className="form" onSubmit={handleLogin}>
				<div className="title">Welcome Back</div>
				<div className="subtitle">Log In</div>
				<div className="input-container ic1">
					<input
						id="credential"
						className="input"
						type="email"
						placeholder=" "
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
					<div className="cut"></div>
					<label htmlFor="credential" className="placeholder">
						Email
					</label>
				</div>
				<div className="input-container ic2">
					<input
						id="password"
						className="input"
						type="password"
						placeholder=" "
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<div className="cut cut-short"></div>
					<label htmlFor="email" className="placeholder">
						Password
					</label>
				</div>
				<button type="submit" className="submit">
					Submit
				</button>
				{errors && (
					<p className="errorMessages">{Object.values(errors)}</p>
				)}
			</form>
		</div>
	);
};

export default LoginFormPage;

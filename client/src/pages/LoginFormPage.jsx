import { useState } from "react";
import * as sessionActions from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
		<div>
			<div>
				<h1>Log In</h1>
			</div>
			<div>
				<form onSubmit={handleLogin}>
					<label>
						Email:
						<input
							type="text"
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
						/>
					</label>
					<label>
						Password:
						<input
							type="text"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					{errors && (
						<p>
							{errors.credentials ||
								errors.undefined ||
								errors.credential}
						</p>
					)}
					<button type="submit">Log In</button>
				</form>
			</div>
		</div>
	);
};

export default LoginFormPage;

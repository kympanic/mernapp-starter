import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../store/session";
import "../css/AuthForm.css";

const SignupFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});

	if (sessionUser) return <Navigate to="/" />;

	const handleSignup = (e) => {
		e.preventDefault();
		setErrors({});
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					name,
					password,
				})
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.message) {
					setErrors(data.errors);
				}
			});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field",
		});
	};

	return (
		<div className="formWrapper">
			<form className="form" onSubmit={handleSignup}>
				<div className="title">Welcome</div>
				<div className="subtitle">Let's create your account!</div>
				<div className="input-container ic1">
					<input
						id="name"
						className="input"
						type="text"
						placeholder=" "
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<div className="cut"></div>
					<label htmlFor="name" className="placeholder">
						Full Name
					</label>
				</div>
				<div className="input-container ic2">
					<input
						id="email"
						className="input"
						type="email"
						placeholder=" "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<div className="cut cut-short"></div>
					<label htmlFor="email" className="placeholder">
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
					<div className="cut"></div>
					<label htmlFor="password" className="placeholder">
						Password
					</label>
				</div>
				<div className="input-container ic2">
					<input
						id="confirmpassword"
						className="input"
						type="password"
						placeholder=" "
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<div className="cut"></div>
					<label htmlFor="confirmpassword" className="placeholder">
						Confirm Password
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

		// <div>
		// 	<div>
		// 		<h1>Sign UP</h1>
		// 	</div>
		// 	<div>
		// 		<form onSubmit={handleSignup}>
		// 			<label>
		// 				Email:
		// 				<input
		// 					type="text"
		// 					value={email}
		// 					onChange={(e) => setEmail(e.target.value)}
		// 					required
		// 				/>
		// 			</label>
		// 			<label>
		// 				Name:
		// 				<input
		// 					type="text"
		// 					value={name}
		// 					onChange={(e) => setName(e.target.value)}
		// 					required
		// 				/>
		// 			</label>
		// 			<label>
		// 				Password
		// 				<input
		// 					type="password"
		// 					value={password}
		// 					onChange={(e) => setPassword(e.target.value)}
		// 					required
		// 				/>
		// 			</label>
		// 			<label>
		// 				Confirm Password
		// 				<input
		// 					type="password"
		// 					value={confirmPassword}
		// 					onChange={(e) => setConfirmPassword(e.target.value)}
		// 					required
		// 				/>
		// 			</label>
		// 			{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
		// 			{errors && <p>{Object.values(errors)}</p>}
		// 			<button type="submit">Sign Up</button>
		// 		</form>
		// 	</div>
		// </div>
	);
};

export default SignupFormPage;

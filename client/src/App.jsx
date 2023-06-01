import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { LoginFormPage, HomePage, SignupFormPage } from "./pages";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Navbar isLoaded={isLoaded} />
			{isLoaded && (
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginFormPage />} />
					<Route path="/signup" element={<SignupFormPage />} />
				</Routes>
			)}
		</BrowserRouter>
	);
}

export default App;

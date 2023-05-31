import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";

// Access store and expose it to window only in non-production
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
}

function Root() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);

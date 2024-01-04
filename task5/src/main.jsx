import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import MoviesProvider from "./MoviesContext";
import App from "./App";
import "./index.css";

axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MoviesProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MoviesProvider>
	</React.StrictMode>
);

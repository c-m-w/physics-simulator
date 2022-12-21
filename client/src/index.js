/// index.js

import React from "react";
import ReactDOM from "react-dom/client";

import {BrowserRouter as Router} from "react-router-dom";

import {UserContextProvider} from "./context/UserContext.js";
import { LevelContextProvider } from "./context/LevelContext.js";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<UserContextProvider>
				<LevelContextProvider>
					<App />
				</LevelContextProvider>
			</UserContextProvider>
		</Router>
	</React.StrictMode>
);

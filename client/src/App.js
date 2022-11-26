/// App.js

import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";

import "./index.css";

function App() {

	return (
		<Routes>
			<Route index element={
				<Home />
			} />
		</Routes>
	);
}

export default App;

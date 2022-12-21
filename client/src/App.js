/// App.js

import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import Simulator from "./pages/Simulator";

import "./index.css";

function App() {

	return (
		<Routes>
			<Route index element={
				<Home />
			} />
			<Route path="simulator" element={
				<Simulator />
			} />
		</Routes>
	);
}

export default App;

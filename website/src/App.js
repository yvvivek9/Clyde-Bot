import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import './App.css';
import Header from "./components/header"
import Home from "./components/home"
import Training from "./components/training"
import Navigation from "./components/navigation"
import Remote from "./components/remote"
import Naming from "./components/naming"
import Admin from "./components/admin"

function App() {
	const [msg, setMsg] = useState([""])
	const [showMsg, setShowMsg] = useState(false)
	const [login, setLogin] = useState({ user: "", pass: "" })
	const [showLogin, setShowLogin] = useState(false)

	const navigate = useNavigate()
	const validateLogin = () => {
		if (login.user === "123" && login.pass === "123") {
			setLogin({ user: "", pass: "" })
			setShowLogin(false)
			navigate("/admin")
		}
		else
			displayMsg("Invalid Credentials")
	}

	const displayMsg = (message) => {
		if(msg[0] === ""){
			setMsg([message])
			setShowMsg(true)
			const msgTimeout = setTimeout(() => {
				setShowMsg(false)
				setMsg([""])
				clearTimeout(msgTimeout)
			}, 2100)
		}
		else
			setMsg([...msg, message])
	}

	return (
		<div className="App">
			<Header showLogin={showLogin} setShowLogin={setShowLogin} />
			<Routes>
				<Route exact index path="/" element={<Home displayMsg={displayMsg} />} />
				<Route exact path="/training" element={<Training displayMsg={displayMsg} />} />
				<Route exact path="/navigation" element={<Navigation displayMsg={displayMsg} />} />
				<Route exact path="/remote" element={<Remote displayMsg={displayMsg} />} />
				<Route exact path="/naming" element={<Naming displayMsg={displayMsg} />} />
				<Route exact path="/admin" element={<Admin displayMsg={displayMsg} />} />
			</Routes>
			{showLogin && <div className="login-box">
				<div style={{ marginBottom: "5%", marginTop: "5%" }}><u>ADMIN  LOGIN</u><br /></div>
				<input type="text" placeholder="Username" value={login.user} onChange={(e) => { setLogin({ ...login, user: e.target.value }) }} /><br />
				<input type="password" placeholder="Password" value={login.pass} onChange={(e) => { setLogin({ ...login, pass: e.target.value }) }} />
				<div className="login-button" onClick={() => { validateLogin() }} >LOGiN</div>
			</div>}
			{showMsg && <div className="message-container">
				{msg.map((message, index) => {
					return	<div className="message-box" key={index}>{message}</div>
				})}
			</div>}
		</div>
	);
}

export default App;

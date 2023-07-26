import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

import "../styling/header.css"
import logo from "../photos/logo.png"
import adminPhoto from "../photos/admin.png"
import pptIcon from "../photos/ppt-icon.png"

export default function Header({ showLogin, setShowLogin, home }) {
    const [battery, setBattery] = useState({ value: 0, charging: false })

    useEffect(() => {
        const interval = setInterval(async () => {
            const response = await axios.post("/battery")
            if (!response.data.error){
                setBattery(response.data)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate()
    const location = useLocation()
    const handleHome = () => {
        if(location.pathname === "/")
            navigate("/presentation")
        else
            navigate("/")
    }

    const handleClick = () => {
        if (showLogin)
            setShowLogin(false)
        else
            setShowLogin(true)
    }

    return (
        <div className="header">
            <div style={{ flex: "75%" }}><img className="header-logo" src={logo} alt="None" /></div>
            <div style={{ flex: "10%" }}>{home && <img className="header-ppt" src={pptIcon} alt="None" onClick={() => { handleHome() }} />}</div>
            <div className="header-battery">
                <div className="battery-holder">
                    <div className="battery-parent">
                        {battery.charging ? <div className="charger"></div> :
                            <div className="battery" style={{height: battery.value + "%"}}></div>
                        }
                    </div>
                </div>
                <div className="battery-value">{battery.value} %</div>
            </div>
            <div style={{ flex: "5%" }}><img className="header-admin-logo" src={adminPhoto} alt="None" onClick={() => { handleClick() }} /></div>
        </div>
    )
}
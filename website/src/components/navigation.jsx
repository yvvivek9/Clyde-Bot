import { useEffect, useState } from "react"
import axios from "axios"

import "../styling/navigation.css"
import Back from "./back"
import Selector from "./selector";
import arrow from "../photos/arrow.png"

export default function Navigation({ displayMsg }) {
    const [zones, setZones] = useState([])
    const [src, setSrc] = useState({ name: " -- SELECT SOURCE -- " })
    const [dest, setDest] = useState({ name: " -- SELECT DESTINATION -- " })
    const [showSrc, setShowSrc] = useState(false)
    const [showDest, setShowDest] = useState(false)
    const [nav, setNav] = useState("default")
    const [navSpeed, setNavSpeed] = useState({ speed: 0, show: false })

    const getZones = async () => {
        var res1 = await axios.post("/zonesList")
        if (!res1.data.error) {
            setZones(res1.data.zones)
        }
        else
            displayMsg("Couldn't fetch total number of zones")
    }

    const getNavSpeed = async () => {
        var res2 = await axios.post("/getNavSpeed")
        if (!res2.data.error) {
            setNavSpeed({ speed: res2.data.speed, show: false })
        }
        else
            displayMsg("Error fetching navigation speed")
    }

    useEffect(() => {
        getZones()
        getNavSpeed()
    }, [])

    const handleNavSpeed = (e) => {
        if (e.target.value <= 100 && e.target.value > 0)
            setNavSpeed({ speed: e.target.value, show: true })
        else
            displayMsg("Speed ranges from 0 - 100")
    }

    const changeNavSpeed = async () => {
        const response = await axios.post("/setNavSpeed", navSpeed)
        if (response.data.error)
            displayMsg("Error updating navigation speed")
        else {
            getNavSpeed()
            displayMsg("Navigation speed updated")
        }
    }

    const navStatus = async () => {
        try {
            const response = await axios.post("/navStatus")
            if (response.data.error) {
                displayMsg("Error updating navigation status")
                navStatus()
            }
            else if (response.data.status === "D") {
                setNav("default")
                displayMsg("Navigation Complete")
            }
            else if (response.data.status === "P") {
                setNav("pause")
                navStatus()
            }
            else if (response.data.status === "R") {
                setNav("resume")
                displayMsg("Navigation ready to resume")
            }
            else {
                navStatus()
            }
        } catch (error) {
            displayMsg("Error updating navigation status")
        }
    }

    const startNavigation = async () => {
        const response = await axios.post("/startNav")
        if (!response.data.error) {
            setNav("active")
            navStatus()
        }
        else
            displayMsg("Error starting navigation")
    }

    return (
        <div className="navigation">
            <div className="nav-container">
                <div style={{ flex: "45%" }}>
                    <div className="nav-select-button" onClick={() => { setShowSrc(true) }}>
                        {src.name ? src.name : src.zone}
                    </div>
                </div>
                <div style={{ flex: "10%" }} >
                    <img src={arrow} alt="arrow" />
                </div>
                <div style={{ flex: "45%" }}>
                    <div className="nav-select-button" onClick={() => { setShowDest(true) }}>
                        {dest.name ? dest.name : dest.zone}
                    </div>
                </div>
                {nav !== "default" && <div className="nav-overlay" style={{top: "10vh"}}></div>}
            </div>
            <div className="nav-speed-container">
                <div className="nav-speed-text">
                    SPEED : <br /> {"(in percentage)"}
                </div>
                <div style={{ flex: "50%" }}>
                    <input className="nav-speed-range" type="range" min={"1"} max={"100"} value={navSpeed.speed} onChange={(e) => { handleNavSpeed(e) }} />
                </div>
                <div style={{ flex: "30%" }}>
                    <input className="nav-speed-percentage" type="text" value={navSpeed.speed} onChange={(e) => { handleNavSpeed(e) }} />
                </div>
                {nav !== "default" && <div className="nav-overlay" style={{opacity: "0"}}></div>}
            </div>
            {navSpeed.show ? 
                <div className="nav-animation"><div className="nav-start-button" onClick={() => {changeNavSpeed()}}>SET SPEED</div></div>:
                <div className="nav-animation">
                    {nav === "default" && src.zone && dest.zone && <div className="nav-start-button" onClick={() => { startNavigation() }} >START</div>}
                    {nav === "active" && <div className="loader"><div className="loaderBar"></div></div>}
                    {nav === "pause" && <div className="nav-animation">Navigation has been paused... Please wait</div>}
                    {nav === "resume" && <div className="nav-start-button" onClick={() => { startNavigation() }} >RESUME</div>}
                </div>
            }
            <Back displayMsg={displayMsg} />
            {showSrc && <Selector zones={zones} text={"SELECT SOURCE"} selZone={src} setZone={setSrc} setView={setShowSrc} displayMsg={displayMsg} />}
            {showDest && <Selector zones={zones} text={"SELECT DESTINATION"} selZone={dest} setZone={setDest} setView={setShowDest} displayMsg={displayMsg} />}
        </div>
    )
}
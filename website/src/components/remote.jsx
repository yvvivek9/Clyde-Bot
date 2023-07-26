import { useState, useEffect } from "react"
import axios from "axios"

import "../styling/remote.css"
import Back from "./back"
import remotePng from "../photos/remote.png"

export default function Remote({ displayMsg, setHome }){
    const [speed, setSpeed] = useState({speed: 0, show: false})

    const getSpeed = async () => {
        const response = await axios.post("/getRemoteSpeed")
        if(!response.data.error)
            setSpeed({speed: response.data.speed, show: false})
        else
            displayMsg("Error fetching speed")
    }

    useEffect(() => {
        getSpeed()
    }, [])

    const handleChange = (value) => {
        if(value > 0 && value <= 100){
            setSpeed({speed: value, show: true})
        }
        else
            displayMsg("Speed ranges between 0 - 100")
    }

    const changeSpeed = async () => {
        try {
            const response = await axios.post("/setRemoteSpeed", speed)
            if(!response.data.error){
                displayMsg("Speed changed successfully")
                getSpeed()
            }
            else{
                displayMsg("Error changing speed")
            }
        } catch (error) {
            displayMsg("Error fetching speed")
        }
    }

    return(
        <div className="remote">
            <div><h1>Please use the provided remote</h1></div>
            <img src={remotePng} alt="remote" />
            <div className="rem-speed">
                <div className="rem-speed-text">
                    SPEED : <br /> {"(in percentage)"}
                </div>
                <div style={{ flex: "40%" }}>
                    <input className="rem-speed-range" type="range" min={"1"} max={"100"} value={speed.speed} onChange={(e) => { handleChange(e.target.value) }} />
                </div>
                <div style={{ flex: "30%" }}>
                    <input className="rem-speed-percentage" type="text" value={speed.speed} onChange={(e) => { handleChange(e.target.value) }} />
                </div>
            </div>
            {speed.show && <div className="rem-start-button" onClick={() => {changeSpeed()}} >SET SPEED</div>}
            <Back displayMsg={displayMsg} setHome={setHome} />
        </div>
    )
}
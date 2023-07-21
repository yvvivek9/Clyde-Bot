import { useState, useEffect } from "react"
import axios from "axios"

import "../styling/naming.css"
import Back from "./back"

export default function Naming({ displayMsg }){
    const [zones, setZones] = useState([])

    const getZones = async () => {
        const response = await axios.post("/zonesList")
        if(!response.data.error){
            setZones(response.data.zones)
        }
        else{
            displayMsg("Error fetching zones")
        }
    }

    useEffect(() => {
        getZones()
    }, [])

    const handleChange = (zone, name) => {
        setZones(zones.map((value, index) => {
            if(value === zone){
                return {...value, name: name}
            }
            else
                return value
        }))
    }

    const handleSubmit = async () => {
        const response = await axios.post("/setZoneName", {
            list: zones
        })
        if(response.data.error)
            displayMsg("Error saving the changes")
        else
            displayMsg("Changes saved successfully")
    }

    return(
        <div className="naming">
            <div className="naming-container">
                {zones.map((zone, index) => {
                    return <div className="naming-container-zones" key={index}>
                        <div><img src={zone.furl} alt={zone.zone} /></div>
                        <div><img src={zone.rurl} alt={zone.zone} /></div>
                        <div style={{paddingTop: "90px"}}>{zone.zone}</div>
                        <div><input type="text" value={zone.name ? zone.name : ""} onChange={(e) => {handleChange(zone, e.target.value)}} /></div>
                    </div>
                })}
                <div className="naming-container-header">
                    <div>Front Camera</div>
                    <div>Rear Camera</div>
                    <div>Zone Name</div>
                    <div>Relative Name</div>
                </div>
            </div>
            <div className="change-button" onClick={() => {handleSubmit()}} >SAVE</div>
            <Back displayMsg={displayMsg} />
        </div>
    )
}
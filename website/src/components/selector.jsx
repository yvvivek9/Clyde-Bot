import { useState, useEffect } from "react"
import axios from "axios"

import "../styling/selector.css"
import cancel from '../photos/cancel.png'

export default function Selector ({ zones, text, selZone, setZone, setView, displayMsg }){
    const [list,  setList] = useState([])
    const [choose, setChoose] = useState({zone: false})
    const [select, setSelect] = useState(true)

    useEffect(() => {
        setList(zones)
        setChoose(selZone)
    }, [])
    
    const handleSubmit = async () => {
        if(text === "SELECT SOURCE"){
            const response = await axios.post("/setNavSource", choose)
            if(response.data.error)
                displayMsg("Error setting the zone")
            else{
                setView(false)
                setZone(choose)
            }
        }
        else{
            const response = await axios.post("/setNavDestination", choose)
            if(response.data.error)
                displayMsg("Error setting the zone")
            else{
                setView(false)
                setZone(choose)
            }
        }
    }

    const handleSelect = (zone) => {
        setSelect(false)
        setChoose(zone)
    }

    return(
        <div className="selector-screen-bg">
            <div className="selector-screen">
                <div className="selector-images">
                    {list.map((zone) => {
                        return <div key={zone.id}
                                style={{ border: choose.zone === zone.zone ? '4px solid blue' : '4px solid white',}}
                                onClick={() => {handleSelect(zone)}}
                            >
                            <img src={zone.furl} alt={zone.zone} />
                            <div>{zone.name ? zone.name : zone.zone}</div>
                        </div>
                    })}
                </div>
                <div className="selector-button-screen">
                    <div className="selector-button" onClick={() => {handleSubmit()}}>{text}</div>
                    {select && <div className="selector-button-overlay"></div>}
                </div>
                <img className="selector-close" src={cancel} alt="cancel" onClick={() => {setView(false)}} />
            </div>
        </div>
    )
}
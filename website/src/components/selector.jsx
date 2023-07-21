import axios from "axios"

import "../styling/selector.css"
import cancel from '../photos/cancel.png'

export default function Selector ({ zones, text, selZone, setZone, setView, displayMsg }){

    const handleClick = (zone) => {
        setZone(zone)
    }

    const handleSubmit = async () => {
        if(text === "SELECT SOURCE"){
            const response = await axios.post("/setNavSource", {
                source: selZone.zone
            })
            if(response.data.error)
                displayMsg("Error setting the zone")
            else
                setView(false)
        }
        else{
            const response = await axios.post("/setNavDestination", {
                destination: selZone.zone
            })
            if(response.data.error)
                displayMsg("Error setting the zone")
            else
                setView(false)
        }
    }

    const forceClose = () => {
        setZone({name: ` -- ${text} -- ` })
        setView(false)
    }

    return(
        <div className="selector-screen-bg">
            <div className="selector-screen">
                <div className="selector-images">
                    {zones.map((zone) => {
                        return <div key={zone.id}
                                style={{ border: selZone === zone ? '4px solid blue' : '4px solid white',}}
                                onClick={() => {handleClick(zone)}}
                            >
                            <img src={zone.furl} alt={zone.zone} />
                            <div>{zone.name ? zone.name : zone.zone}</div>
                        </div>
                    })}
                </div>
                <div className="selector-button-screen">
                    <div className="selector-button" onClick={() => {handleSubmit()}}>{text}</div>
                    {!selZone.zone && <div className="selector-button-overlay"></div>}
                </div>
                <img className="selector-close" src={cancel} alt="cancel" onClick={() => {forceClose()}} />
            </div>
        </div>
    )
}
import "../styling/training.css"

import radar from "../photos/radar.mp4"
import Back from "./back"

export default function Training({ displayMsg }){
    return(
        <div className="training">
            <video src={radar} autoPlay muted loop />
            <Back displayMsg={displayMsg} />
        </div>
    )
}
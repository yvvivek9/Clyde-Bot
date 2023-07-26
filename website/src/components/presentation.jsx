import { useNavigate } from "react-router-dom"
import "../styling/presentation.css"
import Back from "./back"

export default function Presentation ({ displayMsg, setHome }) {
    const navigate = useNavigate()

    return <div className="presentation">
        <video id="pres-video" onEnded={() => {navigate("/")}} autoPlay muted >
            <source src="/images/presentation.mp4" type="video/mp4" />
        </video>
        <Back displayMsg={displayMsg} setHome={setHome} />
    </div>
}
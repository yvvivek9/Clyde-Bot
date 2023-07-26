import { useNavigate } from "react-router-dom"
import axios from "axios"

import "../styling/back.css"

export default function Back({ displayMsg, setHome }){
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            const res1 = await axios.post("/setMode", {mode: "/"})
            if(res1.data.status === "Success"){
                navigate("/")
                setHome(true)
            }
            else
                displayMsg(res1.data.status)
        } catch (error) {
            displayMsg(error)
        }
    }

    return(
        <div className="back-button" onClick={handleClick}>
            &lt;&lt; BACK
        </div>
    )
}
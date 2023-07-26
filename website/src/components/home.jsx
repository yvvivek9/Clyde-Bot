import { useNavigate } from "react-router-dom"
import axios from "axios"

import "../styling/home.css"

export default function Home({ displayMsg, setHome }) {
    const navigate = useNavigate()

    const handleClick = async (route) => {
        try {
            const res1 = await axios.post("/setMode", {mode: route})
            if(res1.data.status === "Success"){
                navigate(route)
                setHome(false)
            }
            else
                displayMsg(res1.data.status)
        } catch (error) {
            displayMsg(`${error}`)
        }
    }

    return (
        <div className="home">
            <div className="home-row">
                <div className="home-col">
                    <div className="button" onClick={() => {handleClick("/training")}}>
                        TRAINING MODE
                    </div>
                </div>
                <div className="home-col">
                    <div className="button" onClick={() => {handleClick("/navigation")}}>
                        NAVIGATION MODE
                    </div>
                </div>
            </div>
            <div className="home-row">
                <div className="home-col">
                    <div className="button" onClick={() => {handleClick("/remote")}}>
                        REMOTE MODE
                    </div>
                </div>
                <div className="home-col">
                    <div className="button" onClick={() => {handleClick("/naming")}}>
                        NAMING MODE
                    </div>
                </div>
            </div>
        </div>
    )
}
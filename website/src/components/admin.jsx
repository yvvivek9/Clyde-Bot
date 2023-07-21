import { useState, useEffect } from "react"
import axios from "axios"

import "../styling/admin.css"
import Back from "./back"

export default function Admin({ displayMsg }){
    const [settings, setSettings] = useState({
        rcam: 0, fcam: 0, tspd: 0, ntresh: 0, ntreshh: 0, oat: 0, fcount: 0,
    })
    const [motion, setMotion] = useState({
        pConst: 0, iConst: 0, dConst: 0, uLimit: 0, lLimit: 0
    })

    const getData = async () => {
        const response1 = await axios.post("/getSettings")
        if(!response1.data.error)
            setSettings(response1.data)
        else
            displayMsg("Error getting settings")

        const response2 = await axios.post("/getMotionControl")
        if(!response2.data.error)
            setMotion(response2.data)
        else
            displayMsg("Error getting Motion settings")
    }

    useEffect(() => {
        getData()
    }, [])

    const changeSettings = async () => {
        const response3 = await axios.post("/setSettings", settings)
        if(!response3.data.error)
            displayMsg("Settings changed succesfully")
        else
            displayMsg("Error changing settings")
    }

    const changeMotion = async () => {
        const response3 = await axios.post("/setMotionControl", motion)
        if(!response3.data.error)
            displayMsg("Motion Controls changed succesfully")
        else
            displayMsg("Error changing Motion Controls")
    }

    return(
        <div className="admin-page">
            <div className="settings-box">
                <div className="settings-heading">
                    <u>SETTINGS</u>
                </div>
                <div className="settings-row">
                    <div>Front Camera Index</div>
                    <div>
                        <input type="text" value={settings.fcam} onChange={(e) => {setSettings({...settings, fcam: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Rear Camera Index</div>
                    <div>
                        <input type="text" value={settings.rcam} onChange={(e) => {setSettings({...settings, rcam: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Training Speed</div>
                    <div>
                        <input type="text" value={settings.tspd} onChange={(e) => {setSettings({...settings, tspd: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Frame Ratio</div>
                    <div>
                        <input type="text" value={settings.ntresh} onChange={(e) => {setSettings({...settings, ntresh: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Frame Adjust Ratio</div>
                    <div>
                        <input type="text" value={settings.ntreshh} onChange={(e) => {setSettings({...settings, ntreshh: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Obstacle Avoidance Threshold</div>
                    <div>
                        <input type="text" value={settings.oat} onChange={(e) => {setSettings({...settings, oat: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="settings-row">
                    <div>Frame Count</div>
                    <div>
                        <input type="text" value={settings.fcount} onChange={(e) => {setSettings({...settings, fcount: e.target.value})}} />
                    </div>
                    <div></div>
                </div>
                <div className="submit-button" onClick={() => {changeSettings()}}>APPLY</div>
            </div>
            <div className="settings-box">
                <div className="settings-heading"><u>MOTION CONTROL</u></div>
                <div className="settings-row">
                    <div>Proportion Constant</div>
                    <div>
                        <input type="text" value={motion.pConst} onChange={(e) => {setMotion({...motion, pConst: e.target.value})}} />
                    </div>
                    <div>
                        <input type="range" value={motion.pConst} min={"0"} max={"1"} step={"0.01"} onChange={(e) => {setMotion({...motion, pConst: e.target.value})}} />
                    </div>
                </div>
                <div className="settings-row">
                    <div>Integral Constant</div>
                    <div>
                        <input type="text" value={motion.iConst} onChange={(e) => {setMotion({...motion, iConst: e.target.value})}} />
                    </div>
                    <div>
                        <input type="range" value={motion.iConst} min={"0"} max={"1"} step={"0.01"} onChange={(e) => {setMotion({...motion, iConst: e.target.value})}} />
                    </div>
                </div>
                <div className="settings-row">
                    <div>Differential Constant</div>
                    <div>
                        <input type="text" value={motion.dConst} onChange={(e) => {setMotion({...motion, dConst: e.target.value})}} />
                    </div>
                    <div>
                        <input type="range" value={motion.dConst} min={"0"} max={"1"} step={"0.01"} onChange={(e) => {setMotion({...motion, dConst: e.target.value})}} />
                    </div>
                </div>
                <div className="settings-row">
                    <div>Upper Limit</div>
                    <div>
                        <input type="text" value={motion.uLimit} onChange={(e) => {setMotion({...motion, uLimit: e.target.value})}} />
                    </div>
                    <div>
                        <input type="range" value={motion.uLimit} min={"0"} max={"255"} onChange={(e) => {setMotion({...motion, uLimit: e.target.value})}} />
                    </div>
                </div>
                <div className="settings-row">
                    <div>Lower Limit</div>
                    <div>
                        <input type="text" value={motion.lLimit} onChange={(e) => {setMotion({...motion, lLimit: e.target.value})}} />
                    </div>
                    <div>
                        <input type="range" value={motion.lLimit} min={"0"} max={"255"} onChange={(e) => {setMotion({...motion, lLimit: e.target.value})}} />
                    </div>
                </div>
                <div className="submit-button" onClick={() => {changeMotion()}}>APPLY</div>
            </div>
            <Back displayMsg={displayMsg} />
        </div>
    )
}
import "../styling/header.css"
import logo from "../photos/logo.png"
import adminPhoto from "../photos/admin.png"

export default function Header({ showLogin, setShowLogin }){

    const handleClick = () => {
        if(showLogin)
            setShowLogin(false)
        else
            setShowLogin(true)
    }

    return(
        <div className="header">
            <img className="header-logo" src={logo} alt="None" />
            <img className="header-admin-logo" src={adminPhoto} alt="None" onClick={() => {handleClick()}} />
        </div>
    )
}
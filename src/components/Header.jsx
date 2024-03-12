import { userAuth } from "../utils/AuthContext"
import {LogOut} from "react-feather"
 

const Header = () => {
    const {user ,handleLogout}=userAuth();
  return (
    <div className="header--wrapper">
        {
            user?(
                <>
                Welcome !! {user.name}
                <LogOut onClick={handleLogout} className="header--link"/>
                </>
            ):(
                    <button >Login</button>
            )
        }
    </div>
  )
}

export default Header
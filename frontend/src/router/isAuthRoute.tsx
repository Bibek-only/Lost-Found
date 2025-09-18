import {Outlet,Navigate} from  "react-router-dom"
import { useSelector } from "react-redux"
const IsAuthRoute = ():any => {
    // run the logic to send the request to backend to check it is authenticated or not
    const {isAuthenticate} = useSelector((state:any) => state.authReducer)
    console.log(isAuthenticate)
    return isAuthenticate?<Outlet />:<Navigate to="/" replace/>
}

export default IsAuthRoute
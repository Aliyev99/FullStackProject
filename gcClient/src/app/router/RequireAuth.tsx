import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function RequireAut() {
    const {user} = useAppSelector(state => state.accaunt);
    const location = useLocation();
    if (!user){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return <Outlet />
}
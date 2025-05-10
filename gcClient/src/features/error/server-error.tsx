import { useLocation } from "react-router-dom"

export default function ServerError(){
    const {state} = useLocation();
    return (
        <h1>{state?.error}</h1>
    )
}